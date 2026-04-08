export const uploadToCloudinary = (
  file: File,
  folder = "posts",
  onProgress?: (percent: number) => void
): Promise<{ url: string; publicId: string; resourceType: string }> => {
  return new Promise((resolve, reject) => {
    // ✅ Validate env vars early
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!preset || !cloudName) {
      return reject("Cloudinary env variables missing");
    }

    // ✅ Optional: 500MB client-side size guard
    if (file.size > 500 * 1024 * 1024) {
      return reject("File exceeds 500MB limit");
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);
    formData.append("folder", folder);

    const xhr = new XMLHttpRequest();

    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`
    );

    // ✅ Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const percent = Math.round((event.loaded / event.total) * 100);
        onProgress(percent);
      }
    };

    xhr.onload = () => {
      // ✅ Check HTTP status too, not just response body
      if (xhr.status !== 200) {
        try {
          const err = JSON.parse(xhr.responseText);
          return reject(err?.error?.message || `HTTP ${xhr.status}`);
        } catch {
          return reject(`HTTP error ${xhr.status}`);
        }
      }

      try {
        const res = JSON.parse(xhr.responseText);
        if (res.secure_url) {
          // ✅ Return more than just URL — useful for delete/tagging later
          resolve({
            url: res.secure_url,
            publicId: res.public_id,
            resourceType: res.resource_type,
          });
        } else {
          reject("Upload failed: no URL returned");
        }
      } catch {
        reject("Invalid JSON response from Cloudinary");
      }
    };

    xhr.onerror = () => reject("Network error during upload");
    xhr.ontimeout = () => reject("Upload timed out");

    // ✅ 10 min timeout for large videos
    xhr.timeout = 10 * 60 * 1000;

    xhr.send(formData);
  });
};