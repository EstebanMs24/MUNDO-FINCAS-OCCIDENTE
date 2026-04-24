import { prisma } from "@/lib/prisma";
import { parseLote } from "@/types/lote";
import CardLote from "@/components/CardLote";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lotes en Venta — Mundo Fincas Occidente",
  description: "Encuentra los mejores lotes en venta en el occidente antioqueño. Santa Fe de Antioquia, Sopetrán, Olaya y más. Consulta directo por WhatsApp.",
};

export default async function LotesPage() {
  const raw = await prisma.lote.findMany({ orderBy: { fechaCreacion: "desc" } });
  const lotes = raw.map(parseLote);

  return (
    <div style={{ background: "#F5F5F5" }} className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🌿</span>
            <span
              className="text-sm font-semibold px-3 py-1 rounded-full"
              style={{ background: "#F0FFF4", color: "#6BCB77" }}
            >
              Lotes en venta
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#333333" }}>
            Lotes en el Occidente Antioqueño
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl">
            Invierte en tierra en una de las regiones más hermosas de Antioquia. Consulta directamente por WhatsApp sin intermediarios.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {lotes.length === 0 ? (
          <div className="text-center py-24">
            <span className="text-6xl block mb-4">🌿</span>
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              Próximamente lotes disponibles
            </h2>
            <p className="text-gray-400 mb-6">
              Estamos preparando nuestra oferta de lotes. Contáctanos para más información.
            </p>
            <a
              href={`https://wa.me/573113726248?text=${encodeURIComponent("Hola 👋 Estoy interesado en lotes en el occidente antioqueño. ¿Tienen disponibilidad?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:opacity-90"
              style={{ background: "#FF5A5F" }}
            >
              Consultar por WhatsApp
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lotes.map((lote) => (
              <CardLote key={lote.id} lote={lote} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
