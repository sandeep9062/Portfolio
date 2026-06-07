"use server";

import connectDB from "@/lib/db";
import Message from "@/models/Message";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// Helper function to verify admin authentication
async function verifyAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") {
      return { success: false, error: "Unauthorized: Admin access required" };
    }
    return { success: true, user: decoded };
  } catch {
    return { success: false, error: "Invalid or expired token" };
  }
}

export async function createMessage(formData) {
  try {
    await connectDB();

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const contactno = formData.get("contactno");

    // Validation
    if (!name || !email || !message) {
      return {
        success: false,
        error: "Name, email, and message are required",
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    const newMessage = new Message({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      contactno: contactno?.trim() || "",
    });

    await newMessage.save();

    // Revalidate the contact page to show new messages if needed
    revalidatePath("/");

    return {
      success: true,
      message: "Message sent successfully!",
      data: {
        id: newMessage._id.toString(),
        name: newMessage.name,
        email: newMessage.email,
        message: newMessage.message,
        contactno: newMessage.contactno,
        createdAt: newMessage.createdAt,
      },
    };
  } catch (error) {
    console.error("Error creating message:", error);
    return {
      success: false,
      error: error.message || "Failed to send message. Please try again.",
    };
  }
}

export async function getMessages() {
  try {
    // Verify admin authentication
    const auth = await verifyAdmin();
    if (!auth.success) {
      return auth;
    }

    await connectDB();

    const messages = await Message.find().sort({ createdAt: -1 }).lean();

    return {
      success: true,
      data: messages.map((msg) => ({
        id: msg._id.toString(),
        name: msg.name,
        email: msg.email,
        message: msg.message,
        contactno: msg.contactno,
        createdAt: msg.createdAt,
        updatedAt: msg.updatedAt,
      })),
    };
  } catch (error) {
    console.error("Error fetching messages:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch messages",
    };
  }
}
