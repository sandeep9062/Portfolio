"use server";

import connectDB from "@/lib/db";
import User from "@/models/User";
import { requireEnv } from "@/lib/env";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function signup(formData: FormData) {
  try {
    await connectDB();

    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      return {
        success: false,
        error: "Email and password are required",
      };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    if (!normalizedEmail || !normalizedPassword) {
      return {
        success: false,
        error: "Email and password are required",
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    // Password validation
    if (normalizedPassword.length < 6) {
      return {
        success: false,
        error: "Password must be at least 6 characters long",
      };
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return {
        success: false,
        error: "Email already in use",
      };
    }

    const passwordHash = await bcrypt.hash(normalizedPassword, 10);
    const user = await User.create({
      email: normalizedEmail,
      passwordHash,
    });

    // Create JWT token
    const token = jwt.sign(
      { id: String(user._id), email: user.email, role: user.role },
      requireEnv("JWT_SECRET"),
      { expiresIn: "1d" },
    );

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return {
      success: true,
      message: "User registered successfully",
      user: {
        id: String(user._id),
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Signup error:", error);
    return {
      success: false,
      error: errorMessage(error, "Signup failed"),
    };
  }
}

export async function login(formData: FormData) {
  try {
    await connectDB();

    const rawEmail = formData.get("email");
    const rawPassword = formData.get("password");

    if (typeof rawEmail !== "string" || typeof rawPassword !== "string") {
      return {
        success: false,
        error: "Email and password are required",
      };
    }

    const email = rawEmail.trim().toLowerCase();
    const password = rawPassword.trim();

    if (!email || !password) {
      return {
        success: false,
        error: "Email and password are required",
      };
    }

    const user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return {
        success: false,
        error: "Invalid email or password",
      };
    }

    // Create JWT token
    const token = jwt.sign(
      { id: String(user._id), email: user.email, role: user.role },
      requireEnv("JWT_SECRET"),
      { expiresIn: "1d" },
    );

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return {
      success: true,
      message: "Login successful",
      user: {
        id: String(user._id),
        email: user.email,
        role: user.role,
      },
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: errorMessage(error, "Login failed"),
    };
  }
}

export async function logout() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete({ name: "auth_token", path: "/" });

    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      error: "Logout failed",
    };
  }
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    const decoded = jwt.verify(token, requireEnv("JWT_SECRET"));
    if (typeof decoded === "string" || !decoded.id) {
      return {
        success: false,
        error: "Invalid or expired token",
      };
    }

    await connectDB();
    const user = await User.findById(decoded.id).select("-passwordHash").lean();

    if (!user) {
      return {
        success: false,
        error: "User not found",
      };
    }

    return {
      success: true,
      user: {
        id: String(user._id),
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  } catch (error) {
    console.error("Get current user error:", error);
    return {
      success: false,
      error: "Invalid or expired token",
    };
  }
}
