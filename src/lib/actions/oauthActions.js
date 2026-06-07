"use server";

import { cookies } from "next/headers";
import connectDB from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI =
  process.env.GOOGLE_REDIRECT_URI ||
  `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google/callback`;

/**
 * Generate Google OAuth authorization URL
 * @returns {Promise<Object>} Authorization URL
 */
export async function getGoogleAuthUrl() {
  try {
    if (!GOOGLE_CLIENT_ID) {
      return {
        success: false,
        error: "Google OAuth not configured",
      };
    }

    const scopes = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ];

    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: "code",
      scope: scopes.join(" "),
      access_type: "offline",
      prompt: "consent",
    });

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

    return {
      success: true,
      data: { authUrl },
    };
  } catch (error) {
    console.error("Google auth URL error:", error);
    return {
      success: false,
      error: error.message || "Failed to generate auth URL",
    };
  }
}

/**
 * Exchange authorization code for tokens
 * @param {string} code - Authorization code from Google
 * @returns {Promise<Object>} Token data
 */
async function exchangeCodeForTokens(code) {
  const tokenUrl = "https://oauth2.googleapis.com/token";
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    code,
    grant_type: "authorization_code",
    redirect_uri: GOOGLE_REDIRECT_URI,
  });

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      error.error_description || "Failed to exchange code for tokens",
    );
  }

  return response.json();
}

/**
 * Get user info from Google
 * @param {string} accessToken - Google access token
 * @returns {Promise<Object>} User info
 */
async function getGoogleUserInfo(accessToken) {
  const response = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user info from Google");
  }

  return response.json();
}

/**
 * Handle Google OAuth callback
 * @param {string} code - Authorization code from Google
 * @returns {Promise<Object>} Auth result
 */
export async function handleGoogleCallback(code) {
  try {
    if (!code) {
      return {
        success: false,
        error: "Authorization code is required",
      };
    }

    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code);

    // Get user info from Google
    const googleUser = await getGoogleUserInfo(tokens.access_token);

    if (!googleUser.email) {
      return {
        success: false,
        error: "Email not provided by Google",
      };
    }

    await connectDB();

    // Find or create user
    let user = await User.findOne({ email: googleUser.email.toLowerCase() });

    if (!user) {
      // Create new user with Google OAuth
      user = await User.create({
        email: googleUser.email.toLowerCase(),
        passwordHash: "", // No password for OAuth users
        role: "user",
        googleId: googleUser.id,
        name: googleUser.name,
        picture: googleUser.picture,
      });
    } else if (!user.googleId) {
      // Link Google account to existing user
      user.googleId = googleUser.id;
      user.name = user.name || googleUser.name;
      user.picture = user.picture || googleUser.picture;
      await user.save();
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id.toString(), email: user.email, role: user.role },
      JWT_SECRET,
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
      message: "Google login successful",
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        name: user.name,
        picture: user.picture,
      },
    };
  } catch (error) {
    console.error("Google callback error:", error);
    return {
      success: false,
      error: error.message || "Google authentication failed",
    };
  }
}

/**
 * Link Google account to current user
 * @param {string} code - Authorization code from Google
 * @returns {Promise<Object>} Link result
 */
export async function linkGoogleAccount(code) {
  try {
    // Get current user
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    // Exchange code for tokens
    const tokens = await exchangeCodeForTokens(code);

    // Get user info from Google
    const googleUser = await getGoogleUserInfo(tokens.access_token);

    if (!googleUser.email) {
      return {
        success: false,
        error: "Email not provided by Google",
      };
    }

    await connectDB();

    // Check if Google account is already linked to another user
    const existingUser = await User.findOne({ googleId: googleUser.id });
    if (existingUser && existingUser._id.toString() !== decoded.id) {
      return {
        success: false,
        error: "This Google account is already linked to another user",
      };
    }

    // Update current user with Google info
    const user = await User.findByIdAndUpdate(
      decoded.id,
      {
        googleId: googleUser.id,
        name: user.name || googleUser.name,
        picture: user.picture || googleUser.picture,
      },
      { new: true },
    ).select("-passwordHash");

    return {
      success: true,
      message: "Google account linked successfully",
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        name: user.name,
        picture: user.picture,
      },
    };
  } catch (error) {
    console.error("Link Google account error:", error);
    return {
      success: false,
      error: error.message || "Failed to link Google account",
    };
  }
}

/**
 * Unlink Google account from current user
 * @returns {Promise<Object>} Unlink result
 */
export async function unlinkGoogleAccount() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return {
        success: false,
        error: "Not authenticated",
      };
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    await connectDB();

    const user = await User.findByIdAndUpdate(
      decoded.id,
      { $unset: { googleId: 1 } },
      { new: true },
    ).select("-passwordHash");

    return {
      success: true,
      message: "Google account unlinked successfully",
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        name: user.name,
        picture: user.picture,
      },
    };
  } catch (error) {
    console.error("Unlink Google account error:", error);
    return {
      success: false,
      error: error.message || "Failed to unlink Google account",
    };
  }
}
