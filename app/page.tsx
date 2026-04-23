import Link from "next/link";
import CardFinca from "@/components/CardFinca";
import { WHATSAPP_NUMBER } from "@/data/fincas";
import { FincaAPI, parseFinca } from "@/types/finca";
import { prisma } from "@/lib/prisma";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const features = [
  {
    emoji: "🏡",
    title: "Fincas Premium",
    desc: "Propiedades seleccionadas y verificadas para garantizar tu comodidad y la de tu familia.",
  },
  {
    emoji: "📲",
    title: "Reserva por WhatsApp",
    desc: "Sin complicaciones ni pagos online. Habla directamente con nosotros y confirma al instante.",
  },
  {
    emoji: "🌿",
    title: "Naturaleza Pura",
    desc: "Rodeadas de vegetación, ríos y paisajes únicos del occidente antioqueño.",
  },
];

export default async function HomePage() {
  let destacadas: FincaAPI[] = [];

  try {
    const rows = await prisma.finca.findMany({
      where: { destacada: true },
      orderBy: { id: "asc" },
    });
    destacadas = rows.map(parseFinca);
  } catch (error) {
    console.error("Error fetching featured fincas:", error);
  }

  const ctaWA = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hola, quiero información sobre las fincas disponibles."
  )}`;

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative flex items-center justify-center text-white"
        style={{
          minHeight: "calc(100vh - 64px)",
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.60) 100%), url(https://picsum.photos/seed/mundo-fincas-hero/1920/1080)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center px-4 max-w-3xl">
          <p className="text-green-300 text-sm font-semibold tracking-widest uppercase mb-4">
            Occidente Antioqueño · Colombia
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-5 drop-shadow-lg leading-tight">
            Mundo Fincas Occidente
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 text-white/90 max-w-xl mx-auto leading-relaxed">
            Escápate a la naturaleza. Fincas con piscina, BBQ y todas las
            comodidades para tu descanso perfecto.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fincas"
              className="inline-block bg-green-500 hover:bg-green-400 text-white font-bold px-9 py-4 rounded-full text-base sm:text-lg transition-all duration-200 hover:scale-105 shadow-xl shadow-green-900/30"
            >
              Ver fincas disponibles
            </Link>
            <a
              href={ctaWA}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 border border-white/40 text-white font-semibold px-9 py-4 rounded-full text-base sm:text-lg transition-all backdrop-blur-sm"
            >
              <WhatsAppIcon />
              WhatsApp
            </a>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-70">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              ¿Por qué elegirnos?
            </h2>
            <p className="mt-3 text-gray-500 max-w-lg mx-auto">
              Las mejores fincas del occidente antioqueño, con reserva fácil y
              directa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="text-center p-7 rounded-2xl bg-green-50 hover:bg-green-100 transition-colors"
              >
                <div className="text-5xl mb-4">{f.emoji}</div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED FINCAS ── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Fincas Destacadas
              </h2>
              <p className="mt-2 text-gray-500">
                Las favoritas de nuestros huéspedes
              </p>
            </div>
            <Link
              href="/fincas"
              className="hidden sm:flex items-center gap-1 text-green-700 hover:text-green-600 font-semibold text-sm transition-colors"
            >
              Ver todas
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destacadas.map((finca) => (
              <CardFinca key={finca.id} finca={finca} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/fincas"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-sm"
            >
              Ver todas las fincas
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20 bg-green-800 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Listo para tu escape perfecto?
          </h2>
          <p className="text-green-200 text-base sm:text-lg mb-8">
            Contáctanos por WhatsApp y reserva tu finca soñada. Respuesta
            inmediata.
          </p>
          <a
            href={ctaWA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20c45e] text-white font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-lg"
          >
            <WhatsAppIcon />
            Chatear por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
