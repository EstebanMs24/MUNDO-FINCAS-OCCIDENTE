"use client";

import { useState, useRef } from "react";
import { FincaAPI } from "@/types/finca";
import { useRouter } from "next/navigation";

interface FincaFormProps {
  finca?: FincaAPI;
  onSubmit?: (data: any) => Promise<void>;
}

const SERVICIOS_DISPONIBLES = [
  "Piscina",
  "WiFi",
  "BBQ",
  "Cocina equipada",
  "Parqueadero",
  "TV",
  "Hamacas",
  "Jardín",
  "Zona de fogón",
  "Cancha de fútbol",
  "Río cercano",
  "Billar",
  "Ping pong",
  "Senderos naturales",
];

export default function FincaForm({ finca, onSubmit }: FincaFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    nombre: finca?.nombre || "",
    descripcion: finca?.descripcion || "",
    precio: finca?.precio.toString() || "",
    ubicacion: finca?.ubicacion || "",
    capacidad: finca?.capacidad.toString() || "",
    destacada: finca?.destacada || false,
  });

  const [selectedServicios, setSelectedServicios] = useState<Set<string>>(
    new Set(finca?.servicios || [])
  );
  const [imagenes, setImagenes] = useState<string[]>(finca?.imagenes || []);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleServicioToggle = (servicio: string) => {
    setSelectedServicios((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(servicio)) {
        newSet.delete(servicio);
      } else {
        newSet.add(servicio);
      }
      return newSet;
    });
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (!files) return;

    setUploadingImages(true);
    setError("");

    try {
      const newImagenes: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formDataUpload,
        });

        if (!res.ok) {
          throw new Error(`Error uploading ${file.name}`);
        }

        const data = await res.json();
        newImagenes.push(data.url);
      }

      setImagenes((prev) => [...prev, ...newImagenes]);
    } catch (err: any) {
      setError(err.message || "Error al subir imágenes");
    } finally {
      setUploadingImages(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagenes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!formData.nombre || !formData.descripcion) {
        setError("Complete los campos requeridos");
        return;
      }

      if (imagenes.length === 0) {
        setError("Debe agregar al menos una imagen");
        return;
      }

      const data = {
        ...formData,
        precio: parseInt(formData.precio),
        capacidad: parseInt(formData.capacidad),
        imagenes,
        servicios: Array.from(selectedServicios),
      };

      if (onSubmit) {
        await onSubmit(data);
      } else if (finca) {
        // Edit
        const res = await fetch(`/api/fincas/${finca.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Error updating finca");
        router.push("/admin/fincas");
      } else {
        // Create
        const res = await fetch("/api/fincas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (!res.ok) throw new Error("Error creating finca");
        router.push("/admin/fincas");
      }
    } catch (err: any) {
      setError(err.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Información Básica */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Información Básica
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="La Esperanza"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción *
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Describe la finca..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Precio por noche *
              </label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="350000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacidad *
              </label>
              <input
                type="number"
                name="capacidad"
                value={formData.capacidad}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="12"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ubicación *
            </label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Santa Fe de Antioquia"
            />
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="destacada"
              checked={formData.destacada}
              onChange={handleInputChange}
              className="w-5 h-5 rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">
              Marcar como destacada
            </span>
          </label>
        </div>
      </div>

      {/* Imágenes */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Imágenes *</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subir imágenes
            </label>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploadingImages}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              {uploadingImages ? "Subiendo..." : "PNG, JPG, GIF hasta 10MB cada una"}
            </p>
          </div>

          {imagenes.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {imagenes.map((url, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={url}
                    alt={`Imagen ${idx + 1}`}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Servicios */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Servicios</h2>

        <div className="grid grid-cols-2 gap-3">
          {SERVICIOS_DISPONIBLES.map((servicio) => (
            <label key={servicio} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedServicios.has(servicio)}
                onChange={() => handleServicioToggle(servicio)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-700">{servicio}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading || uploadingImages}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition-colors"
        >
          {loading ? "Guardando..." : finca ? "Actualizar" : "Crear Finca"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 rounded-lg transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
