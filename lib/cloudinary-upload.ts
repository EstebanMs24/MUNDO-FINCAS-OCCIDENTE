/**
 * Subida directa a Cloudinary usando unsigned upload
 * Sin pasar credenciales por el cliente
 */

interface CloudinaryUploadResponse {
  url: string;
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
}

export async function uploadImageToCloudinary(
  file: File
): Promise<CloudinaryUploadResponse> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "fincas_upload");
  formData.append("folder", "mundo-fincas");
  formData.append("resource_type", "auto");

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!cloudName) {
    throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME no configurada");
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "Error uploading to Cloudinary");
  }

  return response.json();
}

/**
 * Optimizar URL de Cloudinary para miniatura
 */
export function getOptimizedImageUrl(
  secureUrl: string,
  width: number = 400,
  height: number = 300
): string {
  if (!secureUrl.includes("cloudinary.com")) {
    return secureUrl;
  }

  return secureUrl.replace(
    "/upload/",
    `/upload/w_${width},h_${height},c_fill,q_auto,f_auto/`
  );
}

/**
 * Generar URL optimizada para diferentes tamaños
 */
export function generateResponsiveImageUrl(secureUrl: string) {
  return {
    thumbnail: getOptimizedImageUrl(secureUrl, 200, 150),
    preview: getOptimizedImageUrl(secureUrl, 400, 300),
    full: getOptimizedImageUrl(secureUrl, 1200, 800),
  };
}
