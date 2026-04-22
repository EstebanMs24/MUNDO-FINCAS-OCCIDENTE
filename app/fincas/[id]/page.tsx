import { fincas, WHATSAPP_EMAIL } from "@/data/fincas";
import GaleriaImagenes from "@/components/GaleriaImagenes";
import BotonWhatsApp from "@/components/BotonWhatsApp";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

interface Props {
  params: Promise<{ id: string }>;
}

function buscarFinca(id: string) {
  const q = id.toLowerCase();
  return fincas.find(
    (f) => f.id === q || f.codigo.toLowerCase() === q
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const finca = buscarFinca(id);
  if (!finca) return { title: "Finca no encontrada — Mundo Fincas" };
  return {
    title: `${finca.nombre} — Mundo Fincas`,
    description: finca.descripcion,
  };
}

export function generateStaticParams() {
  // Expone tanto el slug como el código como rutas válidas
  return fincas.flatMap((f) => [{ id: f.id }, { id: f.codigo.toLowerCase() }]);
}

const iconoServicio: Record<string, string> = {
  Piscina: "🏊",
  WiFi: "📶",
  BBQ: "🔥",
  "Cocina equipada": "🍳",
  Parqueadero: "🚗",
  TV: "📺",
  Hamacas: "🛋️",
  Jardín: "🌿",
  "Zona de fogón": "🪵",
  "Cancha de fútbol": "⚽",
  "Río cercano": "🏞️",
  Billar: "🎱",
  "Ping pong": "🏓",
  "Senderos naturales": "🥾",
};

export default async function FincaDetallePage({ params }: Props) {
  const { id } = await params;
  const finca = buscarFinca(id);

  if (!finca) notFound();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-400 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-green-600 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link
            href="/fincas"
            className="hover:text-green-600 transition-colors"
          >
            Fincas
          </Link>
          <span>/</span>
          <span className="text-gray-700 font-medium">{finca.nombre}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── LEFT: main content ── */}
          <div className="lg:col-span-2 space-y-5">
            {/* Gallery */}
            <GaleriaImagenes imagenes={finca.imagenes} nombre={finca.nombre} />

            {/* Title + price */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {finca.nombre}
                  </h1>
                  <p className="text-gray-500 mt-1.5 flex items-center gap-1.5 text-sm">
                    <svg
                      className="w-4 h-4 text-green-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {finca.ubicacion}, Occidente Antioqueño
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-700">
                    ${finca.precio.toLocaleString("es-CO")}
                  </p>
                  <p className="text-gray-400 text-sm">por noche</p>
                </div>
              </div>

              {/* Quick stats */}
              <div className="flex gap-6 mt-5 pt-5 border-t border-gray-100 flex-wrap">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {finca.capacidad}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">personas máx.</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {finca.servicios.length}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">servicios</p>
                </div>
                {finca.servicios.includes("Piscina") && (
                  <div className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-2 border border-blue-100">
                    <span className="text-xl">🏊</span>
                    <span className="text-sm font-medium text-blue-700">
                      Piscina
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Descripción
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {finca.descripcion}
              </p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Servicios incluidos
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {finca.servicios.map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-2.5 bg-green-50 rounded-xl px-4 py-3 border border-green-100"
                  >
                    <span className="text-lg">{iconoServicio[s] ?? "✓"}</span>
                    <span className="text-sm text-gray-700 font-medium">
                      {s}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: reservation widget ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <BotonWhatsApp nombreFinca={finca.nombre} />

              {/* Email alternative */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center">
                <p className="text-sm text-gray-400 mb-2">
                  ¿Prefieres el correo?
                </p>
                <a
                  href={`mailto:${WHATSAPP_EMAIL}?subject=Reserva ${finca.nombre}`}
                  className="text-green-700 hover:text-green-600 font-medium text-sm transition-colors break-all"
                >
                  {WHATSAPP_EMAIL}
                </a>
              </div>

              {/* Back link */}
              <Link
                href="/fincas"
                className="flex items-center gap-1.5 text-gray-400 hover:text-green-600 text-sm transition-colors"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Ver todas las fincas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
