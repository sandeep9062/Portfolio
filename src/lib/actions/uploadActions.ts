"use server";

import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";
import { Readable } from "stream";
import { requireEnv } from "@/lib/env";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function errorMessage(error: unknown, fallback: string): string {
  return error instanceof Error && error.message ? error.message : fallback;
}

type UploadResult =
  | { success: true; data: Record<string, unknown> }
  | { success: false; error: string };

/**
 * Upload a file to Cloudinary
 * @param file - The file to upload
 * @param folder - Cloudinary folder (optional)
 */
export async function uploadToCloudinary(
  file: File,
  folder = "portfolio",
): Promise<UploadResult> {
  try {
    if (!file) {
      return {
        success: false,
        error: "No file provided",
      };
    }

    // Convert File to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error("Cloudinary upload failed"));
          } else {
            resolve(result);
          }
        },
      );

      const readable = new Readable();
      readable.push(buffer);
      readable.push(null);
      readable.pipe(uploadStream);
    });

    return {
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      },
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return {
      success: false,
      error: errorMessage(error, "Failed to upload file"),
    };
  }
}

/**
 * Upload multiple files to Cloudinary
 * @param files - Array of files to upload
 * @param folder - Cloudinary folder (optional)
 */
export async function uploadMultipleToCloudinary(
  files: File[],
  folder = "portfolio",
): Promise<{
  success: boolean;
  data?: unknown[];
  errors?: string[];
  error?: string;
}> {
  try {
    if (!files || files.length === 0) {
      return {
        success: false,
        error: "No files provided",
      };
    }

    const uploadPromises = files.map((file) =>
      uploadToCloudinary(file, folder),
    );
    const results = await Promise.all(uploadPromises);

    const successful = results.filter(
      (r): r is Extract<UploadResult, { success: true }> => r.success,
    );
    const failed = results.filter(
      (r): r is Extract<UploadResult, { success: false }> => !r.success,
    );

    return {
      success: failed.length === 0,
      data: successful.map((r) => r.data),
      errors: failed.map((r) => r.error),
    };
  } catch (error) {
    console.error("Multiple upload error:", error);
    return {
      success: false,
      error: errorMessage(error, "Failed to upload files"),
    };
  }
}

/**
 * Delete a file from Cloudinary
 * @param publicId - Cloudinary public ID
 */
export async function deleteFromCloudinary(publicId: string) {
  try {
    if (!publicId) {
      return {
        success: false,
        error: "No public ID provided",
      };
    }

    const result = await cloudinary.uploader.destroy(publicId);

    return {
      success: result.result === "ok",
      data: result,
    };
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return {
      success: false,
      error: errorMessage(error, "Failed to delete file"),
    };
  }
}

/**
 * Get Cloudinary upload signature for client-side uploads
 * @param folder - Cloudinary folder
 */
export async function getUploadSignature(folder = "portfolio") {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      requireEnv("CLOUDINARY_API_SECRET"),
    );

    return {
      success: true,
      data: {
        signature,
        timestamp,
        apiKey: process.env.CLOUDINARY_API_KEY,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        folder,
      },
    };
  } catch (error) {
    console.error("Signature generation error:", error);
    return {
      success: false,
      error: errorMessage(error, "Failed to generate upload signature"),
    };
  }
}
