import { prisma } from "@/lib/prisma";
import { parseLote } from "@/types/lote";
import Link from "next/link";
import DeleteLoteButton from "./DeleteLoteButton";

export const dynamic = "force-dynamic";

export default async function AdminLotesPage() {
  const raw = await prisma.lote.findMany({ orderBy: { fechaCreacion: "desc" } });
  const lotes = raw.map(parseLote);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Lotes</h1>
          <p className="text-gray-500 text-sm mt-0.5">{lotes.length} lote{lotes.length !== 1 ? "s" : ""} registrado{lotes.length !== 1 ? "s" : ""}</p>
        </div>
        <Link
          href="/admin/lotes/nueva"
          className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo lote
        </Link>
      </div>

      {lotes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <span className="text-5xl block mb-3">🌿</span>
          <h2 className="text-lg font-bold text-gray-700 mb-1">Sin lotes aún</h2>
          <p className="text-gray-400 text-sm mb-4">Crea tu primer lote para que aparezca en el catálogo.</p>
          <Link href="/admin/lotes/nueva"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-xl hover:bg-green-700 transition-colors">
            Crear primer lote
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {lotes.map((lote) => (
            <div key={lote.id} className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Thumbnail */}
              <div className="w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                {lote.imagenes[0] ? (
                  <img src={lote.imagenes[0]} alt={lote.nombre} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl">🌿</span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-gray-900">{lote.nombre}</h3>
                  {lote.destacado && (
                    <span className="text-xs bg-yellow-50 text-yellow-700 border border-yellow-200 px-2 py-0.5 rounded-full font-medium">
                      ⭐ Destacado
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{lote.ubicacion} · {lote.area.toLocaleString("es-CO")} m²</p>
                <p className="text-sm font-semibold mt-1" style={{ color: "#2DAAE1" }}>
                  ${lote.precio.toLocaleString("es-CO")}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link
                  href={`/lotes/${lote.id}`}
                  target="_blank"
                  className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Ver
                </Link>
                <Link
                  href={`/admin/lotes/${lote.id}/editar`}
                  className="px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  Editar
                </Link>
                <DeleteLoteButton id={lote.id} nombre={lote.nombre} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
