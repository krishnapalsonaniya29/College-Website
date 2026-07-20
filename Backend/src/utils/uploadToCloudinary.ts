


import { UploadApiResponse } from "cloudinary";
import cloudinary from "../config/cloudinary";

export function uploadFile(
  buffer: Buffer,
  folder: string
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "auto",
        },
        (err, result) => {
          if (err || !result) {
            return reject(err);
          }

          resolve(result);
        }
      )
      .end(buffer);
  });
}

export async function deleteFile(
  publicId: string,
  resourceType: "image" | "raw" | "video" = "image"
) {
  return cloudinary.uploader.destroy(publicId, {
    resource_type: resourceType,
  });
}