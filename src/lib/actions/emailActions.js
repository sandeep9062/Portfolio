"use server";

import nodemailer from "nodemailer";

export async function sendContactEmail(formData) {
  try {
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

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to admin
    const adminEmail = {
      from: process.env.SMTP_USER,
      to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Contact Number:</strong> ${contactno || "Not provided"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Sent from portfolio contact form</small></p>
      `,
    };

    // Auto-reply to user
    const userEmail = {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Thank you for contacting me!",
      html: `
        <h2>Hi ${name},</h2>
        <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
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
      error: error.message || "Failed to send email. Please try again.",
    };
  }
}

export async function sendNotificationEmail({ to, subject, html }) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

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
      error: error.message || "Failed to send notification email",
    };
  }
}
