import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { parseLote, LoteAPI } from "@/types/lote";
import GaleriaImagenes from "@/components/GaleriaImagenes";
import { WHATSAPP_NUMBER, WHATSAPP_EMAIL } from "@/data/fincas";

interface Props {
  params: Promise<{ id: string }>;
}

async function getLote(id: string): Promise<LoteAPI | null> {
  try {
    const lote = await prisma.lote.findUnique({ where: { id: parseInt(id) } });
    if (!lote) return null;
    return parseLote(lote);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const lote = await getLote(id);
  if (!lote) return { title: "Lote no encontrado — Mundo Fincas" };
  return {
    title: `${lote.nombre} — Lotes Mundo Fincas`,
    description: lote.descripcion,
  };
}

export default async function LoteDetallePage({ params }: Props) {
  const { id } = await params;
  const lote = await getLote(id);
  if (!lote) notFound();

  const mensaje = encodeURIComponent(
    `Hola 👋 Estoy interesado en el lote *${lote.nombre}* en *${lote.ubicacion}*, área de *${lote.area.toLocaleString("es-CO")} m²* con precio de *$${lote.precio.toLocaleString("es-CO")}*. ¿Podría darme más información sobre condiciones de venta?`
  );
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-400 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-green-600 transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/lotes" className="hover:text-green-600 transition-colors">Lotes</Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">{lote.nombre}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: main content */}
          <div className="lg:col-span-2 space-y-5">
            <GaleriaImagenes imagenes={lote.imagenes} nombre={lote.nombre} />

            {/* Title + price */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{lote.nombre}</h1>
                  <p className="text-gray-500 mt-1.5 flex items-center gap-1.5 text-sm">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" style={{ color: "#6BCB77" }}>
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {lote.ubicacion}, Occidente Antioqueño
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold" style={{ color: "#2DAAE1" }}>
                    ${lote.precio.toLocaleString("es-CO")}
                  </p>
                  <p className="text-gray-400 text-sm">precio de venta</p>
                </div>
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-5 pt-5 border-t border-gray-100 flex-wrap">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{lote.area.toLocaleString("es-CO")}</p>
                  <p className="text-xs text-gray-400 mt-0.5">metros cuadrados</p>
                </div>
                <div
                  className="flex items-center gap-2 rounded-xl px-4 py-2 border"
                  style={{ background: "#F0FFF4", borderColor: "#bbf7d0" }}
                >
                  <span className="text-xl">🌿</span>
                  <span className="text-sm font-medium" style={{ color: "#6BCB77" }}>Lote en venta</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Descripción</h2>
              <p className="text-gray-600 leading-relaxed">{lote.descripcion}</p>
            </div>
          </div>

          {/* Right: contact widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              {/* WhatsApp CTA */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="font-bold text-xl mb-1" style={{ color: "#333333" }}>
                  ¿Te interesa este lote?
                </h3>
                <p className="text-gray-400 text-sm mb-5">
                  Consulta disponibilidad y condiciones de pago directamente por WhatsApp
                </p>

                <div
                  className="rounded-xl p-3 text-xs leading-relaxed border mb-4"
                  style={{ background: "#F5F5F5", borderColor: "#e5e7eb", color: "#555" }}
                >
                  <span className="font-semibold" style={{ color: "#333" }}>Mensaje que enviarás: </span>
                  Hola 👋 Estoy interesado en el lote <strong>{lote.nombre}</strong> en {lote.ubicacion}, área de {lote.area.toLocaleString("es-CO")} m² con precio de ${lote.precio.toLocaleString("es-CO")}. ¿Podría darme más información sobre condiciones de venta?
                </div>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 active:scale-95"
                  style={{ background: "#FF5A5F" }}
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Consultar por WhatsApp
                </a>

                <p className="mt-3 text-center text-xs text-gray-400">
                  Sin compromiso · Respuesta inmediata
                </p>
              </div>

              {/* Email */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                <p className="text-sm text-gray-400 mb-2">¿Prefieres el correo?</p>
                <a
                  href={`mailto:${WHATSAPP_EMAIL}?subject=Consulta lote ${lote.nombre}`}
                  className="text-green-700 hover:text-green-600 font-medium text-sm transition-colors break-all"
                >
                  {WHATSAPP_EMAIL}
                </a>
              </div>

              <Link
                href="/lotes"
                className="flex items-center gap-1.5 text-gray-400 hover:text-green-600 text-sm transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Ver todos los lotes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
