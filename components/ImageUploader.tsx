"use client";

import { useState, useRef, useCallback } from "react";
import { uploadImageToCloudinary } from "@/lib/cloudinary-upload";

interface ImageUploaderProps {
  onImagesChange: (urls: string[]) => void;
  initialImages?: string[];
  maxImages?: number;
}

interface UploadingFile {
  id: string;
  file: File;
  progress: number;
  error?: string;
}

export default function ImageUploader({
  onImagesChange,
  initialImages = [],
  maxImages = 10,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragOverRef = useRef(false);

  const [uploadedImages, setUploadedImages] = useState<string[]>(initialImages);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Validar archivo
  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith("image/")) {
      return "Solo se permiten imágenes";
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return "La imagen no debe superar 10MB";
    }

    return null;
  };

  // Procesar archivos para subida
  const processFiles = useCallback(
    async (files: File[]) => {
      const filesToUpload: File[] = [];

      for (const file of files) {
        const error = validateFile(file);
        if (error) {
          alert(`${file.name}: ${error}`);
          continue;
        }

        if (uploadedImages.length + filesToUpload.length >= maxImages) {
          alert(`Máximo ${maxImages} imágenes permitidas`);
          break;
        }

        filesToUpload.push(file);
      }

      if (filesToUpload.length === 0) return;

      // Agregar a la lista de subida
      const newUploading: UploadingFile[] = filesToUpload.map((file) => ({
        id: Math.random().toString(36),
        file,
        progress: 0,
      }));

      setUploadingFiles((prev) => [...prev, ...newUploading]);

      // Subir cada archivo
      for (const uploading of newUploading) {
        try {
          const result = await uploadImageToCloudinary(uploading.file);

          setUploadedImages((prev) => [...prev, result.secure_url]);
          onImagesChange([...uploadedImages, result.secure_url]);

          // Marcar como completado
          setUploadingFiles((prev) =>
            prev.map((u) =>
              u.id === uploading.id ? { ...u, progress: 100 } : u
            )
          );

          // Remover después de 500ms
          setTimeout(() => {
            setUploadingFiles((prev) => prev.filter((u) => u.id !== uploading.id));
          }, 500);
        } catch (error: any) {
          console.error("Upload error:", error);
          setUploadingFiles((prev) =>
            prev.map((u) =>
              u.id === uploading.id
                ? { ...u, error: error.message || "Error en subida" }
                : u
            )
          );
        }
      }
    },
    [uploadedImages, onImagesChange, maxImages]
  );

  // Click en input file
  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  // Selección de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Drag and drop
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files || []);
    processFiles(files);
  };

  // Eliminar imagen
  const handleRemoveImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    onImagesChange(newImages);
  };

  const isMaxReached = uploadedImages.length >= maxImages;

  return (
    <div className="space-y-4">
      {/* Area de carga */}
      {!isMaxReached && (
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`relative rounded-2xl border-2 border-dashed transition-all ${
            isDragging
              ? "border-green-500 bg-green-50"
              : "border-gray-300 bg-gray-50 hover:border-green-400"
          }`}
        >
          <button
            type="button"
            onClick={handleFileInputClick}
            className="w-full px-6 py-12 flex flex-col items-center justify-center gap-3 cursor-pointer group"
          >
            {/* Icono */}
            <div className="relative">
              <svg
                className={`w-12 h-12 transition-all ${
                  isDragging
                    ? "text-green-500 scale-110"
                    : "text-gray-400 group-hover:text-green-500"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 16v-4m0 0V8m0 4l3-3m-3 3l-3-3m9 11H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2z"
                />
              </svg>
              {isDragging && (
                <div className="absolute inset-0 animate-ping bg-green-400 rounded-full opacity-20" />
              )}
            </div>

            {/* Texto */}
            <div className="text-center">
              <p className="font-semibold text-gray-700">
                {isDragging
                  ? "Suelta las imágenes aquí"
                  : "Arrastra imágenes o click para seleccionar"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                PNG, JPG, GIF hasta 10MB cada una
              </p>
            </div>

            {/* Contador */}
            {uploadedImages.length > 0 && (
              <div className="mt-2 inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {uploadedImages.length}/{maxImages} imágenes
              </div>
            )}
          </button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {isMaxReached && (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center">
          <p className="text-gray-600">
            Has alcanzado el máximo de {maxImages} imágenes
          </p>
        </div>
      )}

      {/* Imágenes subiendo */}
      {uploadingFiles.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {uploadingFiles.map((uploading) => (
            <div
              key={uploading.id}
              className="relative rounded-lg overflow-hidden bg-gray-100"
            >
              {/* Miniatura */}
              <img
                src={URL.createObjectURL(uploading.file)}
                alt="preview"
                className="w-full h-32 object-cover opacity-40"
              />

              {/* Overlay de carga */}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-2">
                {uploading.error ? (
                  <>
                    <svg
                      className="w-6 h-6 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <p className="text-red-500 text-xs font-medium text-center px-2">
                      {uploading.error}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    <p className="text-white text-xs font-medium">
                      {uploading.progress}%
                    </p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Imágenes subidas */}
      {uploadedImages.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Imágenes subidas ({uploadedImages.length})
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {uploadedImages.map((url, index) => (
              <div
                key={url}
                className="group relative rounded-lg overflow-hidden border border-gray-200 hover:border-green-500 transition-all"
              >
                {/* Imagen */}
                <img
                  src={url}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform"
                />

                {/* Badge de número */}
                <div className="absolute top-1 left-1 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded">
                  {index + 1}
                </div>

                {/* Botón eliminar */}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute inset-0 bg-black/0 hover:bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                >
                  <div className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </button>

                {/* Hover info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-xs font-medium truncate">
                    Click X para eliminar
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info adicional */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
        <p className="font-medium mb-1">💡 Consejos:</p>
        <ul className="space-y-1 text-xs">
          <li>• Arrastra y suelta múltiples imágenes a la vez</li>
          <li>• La primera imagen es la que aparece en el catálogo</li>
          <li>• Elimina o reorganiza las imágenes según sea necesario</li>
        </ul>
      </div>
    </div>
  );
}
