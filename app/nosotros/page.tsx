import type { Metadata } from "next";
import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/data/fincas";

export const metadata: Metadata = {
  title: "Nosotros — Mundo Fincas",
  description:
    "Conoce a Mundo Fincas Occidente: más de 3 años creando experiencias memorables en el alquiler de fincas en el occidente antioqueño.",
};

const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, quiero saber más sobre Mundo Fincas."
)}`;

const valores = [
  {
    icono: "🤝",
    titulo: "Confianza real",
    desc: "Lo que ves es lo que disfrutas. Sin sorpresas ni letras pequeñas.",
  },
  {
    icono: "⭐",
    titulo: "Experiencia",
    desc: "No solo alquilamos fincas, creamos momentos inolvidables.",
  },
  {
    icono: "⚡",
    titulo: "Agilidad",
    desc: "Atención rápida, sin vueltas ni complicaciones.",
  },
  {
    icono: "💎",
    titulo: "Calidad",
    desc: "Fincas seleccionadas y verificadas para tu tranquilidad.",
  },
  {
    icono: "🫂",
    titulo: "Cercanía",
    desc: "Trato humano, directo y siempre disponible cuando nos necesitas.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="bg-gray-50">

      {/* ── Hero ── */}
      <section
        className="relative py-24 flex items-center justify-center text-white overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a4731 0%, #2d6a4f 60%, #52b788 100%)",
        }}
      >
        {/* Decoración */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/3" />

        <div className="relative text-center px-4 max-w-2xl">
          <span className="inline-block bg-white/15 text-white text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 backdrop-blur-sm border border-white/20">
            Nuestra empresa
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 leading-tight">
            🏡 Mundo Fincas<br />
            <span className="text-green-200">Occidente</span>
          </h1>
          <p className="text-white/80 text-lg">
            Más de 3 años creando experiencias memorables en el occidente antioqueño.
          </p>
        </div>
      </section>

      {/* ── Historia ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div>
              <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">
                Quiénes somos
              </span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-5">
                Una historia construida con pasión
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  En <strong className="text-gray-900">Mundo Fincas Occidente</strong>, llevamos más de 3 años en
                  el mercado ofreciendo experiencias únicas en el alquiler de
                  fincas. A lo largo de este tiempo, hemos recorrido un camino
                  lleno de aprendizajes que nos han permitido crecer, mejorar y
                  consolidarnos como una opción confiable para nuestros clientes.
                </p>
                <p>
                  Durante este proceso, hemos enfrentado retos que nos han
                  impulsado a evolucionar y fortalecer nuestro compromiso con la
                  calidad y la transparencia. Cada experiencia nos ha enseñado a
                  entender mejor las necesidades de quienes confían en nosotros,
                  permitiéndonos brindar un servicio más cercano, ágil y
                  personalizado.
                </p>
                <p>
                  Hoy, en Mundo Fincas Occidente, no solo conectamos personas
                  con espacios, sino que{" "}
                  <strong className="text-green-700">
                    creamos momentos inolvidables
                  </strong>{" "}
                  en entornos pensados para el descanso, la diversión y la
                  conexión.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { valor: "5+", label: "Años de experiencia" },
                { valor: "15+", label: "Fincas disponibles" },
                { valor: "100%", label: "Clientes satisfechos" },
                { valor: "24/7", label: "Atención disponible" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center hover:bg-green-100 transition-colors"
                >
                  <p className="text-3xl font-bold text-green-700 mb-1">
                    {s.valor}
                  </p>
                  <p className="text-sm text-gray-500 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Misión y Visión ── */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Hacia dónde vamos
            </h2>
            <p className="mt-3 text-gray-500">El propósito que nos mueve cada día.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Misión */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-5 text-2xl">
                🎯
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Misión</h3>
              <p className="text-gray-600 leading-relaxed">
                En Mundo Fincas Occidente, creamos experiencias memorables
                conectando personas con fincas exclusivas, a través de un
                servicio <strong className="text-gray-800">cercano, ágil y confiable</strong>.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mb-5 text-2xl">
                🚀
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visión</h3>
              <p className="text-gray-600 leading-relaxed">
                Ser la <strong className="text-gray-800">marca referente</strong> en alquiler de
                fincas en el occidente colombiano, destacándonos por nuestra
                confianza, atención personalizada y experiencia digital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Valores ── */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold text-sm uppercase tracking-wide">
              Lo que nos define
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
              💎 Nuestros valores
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {valores.map((v) => (
              <div
                key={v.titulo}
                className="group flex gap-4 bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 rounded-2xl p-6 transition-all duration-200"
              >
                <div className="text-3xl flex-shrink-0 mt-0.5">{v.icono}</div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 group-hover:text-green-800 transition-colors">
                    {v.titulo}
                  </h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-green-800 text-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para vivir la experiencia?
          </h2>
          <p className="text-green-200 mb-8">
            Contáctanos y encuentra la finca perfecta para tu próxima escapada.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fincas"
              className="inline-block bg-white text-green-800 font-bold px-8 py-3.5 rounded-full hover:bg-green-50 transition-colors"
            >
              Ver fincas
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20c45e] text-white font-bold px-8 py-3.5 rounded-full transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chatear ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
