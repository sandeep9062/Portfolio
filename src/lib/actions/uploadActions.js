"use server";

import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file to Cloudinary
 * @param {File} file - The file to upload
 * @param {string} folder - Cloudinary folder (optional)
 * @returns {Promise<Object>} Upload result
 */
export async function uploadToCloudinary(file, folder = "portfolio") {
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
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
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
      error: error.message || "Failed to upload file",
    };
  }
}

/**
 * Upload multiple files to Cloudinary
 * @param {File[]} files - Array of files to upload
 * @param {string} folder - Cloudinary folder (optional)
 * @returns {Promise<Object>} Upload results
 */
export async function uploadMultipleToCloudinary(files, folder = "portfolio") {
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

    const successful = results.filter((r) => r.success);
    const failed = results.filter((r) => !r.success);

    return {
      success: failed.length === 0,
      data: successful.map((r) => r.data),
      errors: failed.map((r) => r.error),
    };
  } catch (error) {
    console.error("Multiple upload error:", error);
    return {
      success: false,
      error: error.message || "Failed to upload files",
    };
  }
}

/**
 * Delete a file from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteFromCloudinary(publicId) {
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
      error: error.message || "Failed to delete file",
    };
  }
}

/**
 * Get Cloudinary upload signature for client-side uploads
 * @param {string} folder - Cloudinary folder
 * @returns {Promise<Object>} Signature data
 */
export async function getUploadSignature(folder = "portfolio") {
  try {
    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      process.env.CLOUDINARY_API_SECRET,
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
      error: error.message || "Failed to generate upload signature",
    };
  }
}
