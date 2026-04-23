"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FincaAPI } from "@/types/finca";
import { useRouter } from "next/navigation";

export default function AdminFincasPage() {
  const router = useRouter();
  const [fincas, setFincas] = useState<FincaAPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    fetchFincas();
  }, []);

  const fetchFincas = async () => {
    try {
      const res = await fetch("/api/fincas");
      const data = await res.json();
      setFincas(data);
    } catch (error) {
      console.error("Error fetching fincas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta finca?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/fincas/${id}`, { method: "DELETE" });
      if (res.ok) {
        setFincas(fincas.filter((f) => f.id !== id));
      } else {
        alert("Error al eliminar");
      }
    } catch (error) {
      alert("Error de conexión");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Fincas</h1>
        <Link
          href="/admin/fincas/nueva"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          + Nueva Finca
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Cargando...</p>
        </div>
      ) : fincas.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center border border-gray-200">
          <p className="text-gray-500 mb-4">No hay fincas creadas</p>
          <Link
            href="/admin/fincas/nueva"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Crear la primera finca →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Ubicación
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Precio
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Capacidad
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                  Destacada
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {fincas.map((finca) => (
                <tr key={finca.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {finca.nombre}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {finca.ubicacion}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    ${finca.precio.toLocaleString("es-CO")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {finca.capacidad} personas
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {finca.destacada ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                        Sí
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                        No
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/admin/fincas/${finca.id}/editar`}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(finca.id)}
                      disabled={deletingId === finca.id}
                      className="text-red-600 hover:text-red-700 text-sm font-medium disabled:opacity-50"
                    >
                      {deletingId === finca.id ? "Eliminando..." : "Eliminar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
