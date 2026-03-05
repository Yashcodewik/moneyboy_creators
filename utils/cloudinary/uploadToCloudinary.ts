export type Uploadable = File | Blob | string;

function ensureEnv() {
  if (
    !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
    !process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
  ) {
    throw new Error(
      "Missing Cloudinary env. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET"
    );
  }
}

async function toBlob(input: Uploadable): Promise<{ blob: Blob; filename?: string; mime?: string }> {
  if (input instanceof File) return { blob: input, filename: input.name, mime: input.type };
  if (input instanceof Blob) return { blob: input, mime: (input as any).type };
  const res = await fetch(input);
  const blob = await res.blob();
  return { blob, mime: blob.type };
}

export const uploadToCloudinary = async (
  folderName: string,
  file: Uploadable,
  progressCallback?: (percentage: number) => void
): Promise<string> => {
  ensureEnv();

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

  const { blob, filename, mime } = await toBlob(file);

  let resource: "image" | "video" | "raw" = "raw";

  if (mime?.startsWith("image/")) resource = "image";
  else if (mime?.startsWith("video/")) resource = "video";

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resource}/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    const formData = new FormData();
    formData.append("file", blob, filename ?? "upload");
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", folderName);

    xhr.open("POST", endpoint);

    xhr.upload.addEventListener("progress", (e) => {
      if (progressCallback && e.lengthComputable) {
        progressCallback(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.onload = () => {
      const res = JSON.parse(xhr.responseText || "{}");

      if (xhr.status >= 200 && xhr.status < 300 && res?.secure_url) {
        resolve(res.secure_url);
      } else {
        reject("Upload failed");
      }
    };

    xhr.onerror = () => reject("Network error");

    xhr.send(formData);
  });
};