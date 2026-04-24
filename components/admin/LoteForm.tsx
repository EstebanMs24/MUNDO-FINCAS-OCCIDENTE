"use client";

import { useState, useRef } from "react";
import { LoteAPI } from "@/types/lote";
import { useRouter } from "next/navigation";

interface Props {
  lote?: LoteAPI;
}

export default function LoteForm({ lote }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    nombre: lote?.nombre ?? "",
    descripcion: lote?.descripcion ?? "",
    precio: lote?.precio.toString() ?? "",
    ubicacion: lote?.ubicacion ?? "",
    area: lote?.area.toString() ?? "",
    destacado: lote?.destacado ?? false,
  });
  const [imagenes, setImagenes] = useState<string[]>(lote?.imagenes ?? []);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploadingImages(true);
    setError("");
    try {
      const newImagenes: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const fd = new FormData();
        fd.append("file", files[i]);
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (!res.ok) throw new Error(`Error subiendo ${files[i].name}`);
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
    if (!formData.nombre || !formData.descripcion || !formData.precio || !formData.area) {
      setError("Completa todos los campos requeridos");
      return;
    }
    if (imagenes.length === 0) {
      setError("Agrega al menos una imagen");
      return;
    }
    setLoading(true);
    try {
      const body = {
        ...formData,
        precio: parseInt(formData.precio),
        area: parseInt(formData.area),
        imagenes,
      };
      const url = lote ? `/api/lotes/${lote.id}` : "/api/lotes";
      const method = lote ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Error al guardar");
      router.push("/admin/lotes");
    } catch (err: any) {
      setError(err.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Información básica */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Información básica</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre del lote *</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange}
              className={inputClass} placeholder="Lote El Encanto" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción *</label>
            <textarea name="descripcion" value={formData.descripcion} onChange={handleInputChange}
              rows={4} className={inputClass} placeholder="Describe el lote, características, vías de acceso..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Precio de venta (COP) *</label>
              <input type="number" name="precio" value={formData.precio} onChange={handleInputChange}
                className={inputClass} placeholder="50000000" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Área (m²) *</label>
              <input type="number" name="area" value={formData.area} onChange={handleInputChange}
                className={inputClass} placeholder="5000" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Ubicación *</label>
            <input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleInputChange}
              className={inputClass} placeholder="Santa Fe de Antioquia" />
          </div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" name="destacado" checked={formData.destacado} onChange={handleInputChange}
              className="w-5 h-5 rounded border-gray-300" />
            <span className="text-sm font-medium text-gray-700">Marcar como destacado (aparece en la página principal)</span>
          </label>
        </div>
      </div>

      {/* Imágenes */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-5">Imágenes *</h2>
        <input ref={fileInputRef} type="file" multiple accept="image/*"
          onChange={handleImageUpload} disabled={uploadingImages}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
        <p className="text-xs text-gray-400 mt-1">
          {uploadingImages ? "Subiendo imágenes..." : "PNG, JPG hasta 10MB cada una"}
        </p>
        {imagenes.length > 0 && (
          <div className="grid grid-cols-4 gap-3 mt-4">
            {imagenes.map((url, idx) => (
              <div key={idx} className="relative group">
                <img src={url} alt={`Imagen ${idx + 1}`} className="w-full h-24 object-cover rounded-lg" />
                <button type="button" onClick={() => handleRemoveImage(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex gap-3">
        <button type="submit" disabled={loading || uploadingImages}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-medium py-2.5 rounded-lg transition-colors text-sm">
          {loading ? "Guardando..." : lote ? "Actualizar lote" : "Crear lote"}
        </button>
        <button type="button" onClick={() => router.back()}
          className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2.5 rounded-lg transition-colors text-sm">
          Cancelar
        </button>
      </div>
    </form>
  );
}
