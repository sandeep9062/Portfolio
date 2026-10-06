"use server";

import nodemailer from "nodemailer";

function createTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

export async function sendContactEmail(formData: FormData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const contactno = formData.get("contactno");

    // Validation
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      typeof contactno !== "string" ||
      !name ||
      !email ||
      !message ||
      !contactno
    ) {
      return {
        success: false,
        error: "Name, email, contact number, and message are required",
      };
    }

    const nameValue = name.trim();
    const emailValue = email.trim();
    const messageValue = message.trim();
    const contactnoValue = contactno.trim();

    if (!nameValue || !emailValue || !messageValue || !contactnoValue) {
      return {
        success: false,
        error: "Name, email, contact number, and message are required",
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    // Create transporter
    const transporter = createTransport();

    // Email to admin
    const adminEmail = {
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `New Contact Form Submission from ${nameValue}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${nameValue}</p>
        <p><strong>Email:</strong> ${emailValue}</p>
        <p><strong>Contact Number:</strong> ${contactnoValue}</p>
        <p><strong>Message:</strong></p>
        <p>${messageValue}</p>
        <hr>
        <p><small>Sent from portfolio contact form</small></p>
      `,
    };

    // Auto-reply to user
    const userEmail = {
      from: process.env.SMTP_USER,
      to: emailValue,
      subject: "Thank you for contacting me!",
      html: `
        <h2>Hi ${nameValue},</h2>
        <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p>${messageValue}</p>
        <hr>
        <p>Best regards,<br>Sandeep Saini</p>
      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminEmail),
      transporter.sendMail(userEmail),
    ]);

    return {
      success: true,
      message: "Email sent successfully!",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: errorMessage(error, "Failed to send email. Please try again."),
    };
  }
}

export async function sendNotificationEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const transporter = createTransport();

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html,
    });

    return {
      success: true,
      message: "Notification email sent successfully!",
    };
  } catch (error) {
    console.error("Error sending notification email:", error);
    return {
      success: false,
      error: errorMessage(error, "Failed to send notification email"),
    };
  }
}
