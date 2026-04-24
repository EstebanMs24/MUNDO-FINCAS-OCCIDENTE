import Link from "next/link";
import CardFinca from "@/components/CardFinca";
import { WHATSAPP_NUMBER, WHATSAPP_EMAIL } from "@/data/fincas";
import { FincaAPI, parseFinca } from "@/types/finca";
import { prisma } from "@/lib/prisma";

// ── WhatsApp helpers ──────────────────────────────────────────────────────────
const waUrl = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const WA_HERO = waUrl("Hola 👋 Quiero información sobre las fincas disponibles en el Occidente Antioqueño.");
const WA_FINAL = waUrl("Hola, me interesa reservar una finca. ¿Cuáles tienen disponibles este fin de semana?");

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const testimonios = [
  {
    nombre: "Familia Martínez",
    iniciales: "FM",
    texto: "Llegamos cansados de la semana y nos fuimos renovados. La finca era exactamente como en las fotos — limpia, amplia y con todo funcionando. La atención por WhatsApp fue rapidísima. Ya reservamos para diciembre.",
    estrellas: 5,
    lugar: "Medellín",
    tag: "Familia de 10 personas",
  },
  {
    nombre: "Camilo y amigos",
    iniciales: "CA",
    texto: "Éramos 14 y pensábamos que sería difícil encontrar algo. En menos de 20 minutos por WhatsApp ya teníamos todo confirmado. La piscina, el BBQ, la cancha... fue el mejor plan del año. Volveremos seguro.",
    estrellas: 5,
    lugar: "Bogotá",
    tag: "Grupo de amigos",
  },
  {
    nombre: "Sandra & Javier",
    iniciales: "SJ",
    texto: "Buscábamos privacidad total para nuestro aniversario. Nos recomendaron esta finca y fue una decisión perfecta. Silencio, naturaleza, piscina para nosotros solos. Lo que necesitábamos sin siquiera saberlo.",
    estrellas: 5,
    lugar: "Cali",
    tag: "Escapada en pareja",
  },
  {
    nombre: "Lorena Ospina",
    iniciales: "LO",
    texto: "Organicé el cumpleaños de mi mamá aquí. 18 personas, cocina enorme, espacio para todos. No hubo un solo momento incómodo. La finca superó las expectativas y mi mamá no para de hablar del día. Vale cada peso.",
    estrellas: 5,
    lugar: "Medellín",
    tag: "Celebración familiar",
  },
  {
    nombre: "Equipo Creativo Co.",
    iniciales: "EC",
    texto: "Usamos la finca para un retiro de equipo. Nos desconectamos del todo, trabajamos diferente y conectamos como nunca. El occidente antioqueño tiene algo especial. Ya lo convertimos en tradición anual.",
    estrellas: 5,
    lugar: "Medellín",
    tag: "Retiro corporativo",
  },
];

const pasos = [
  {
    numero: "01",
    titulo: "Escríbenos por WhatsApp",
    desc: "Cuéntanos cuántas personas son, qué fechas tienen y qué buscan. Te respondemos en minutos.",
    icono: "💬",
  },
  {
    numero: "02",
    titulo: "Te enviamos opciones",
    desc: "Te mostramos las fincas disponibles con fotos, precios y detalles. Sin letra pequeña.",
    icono: "🏡",
  },
  {
    numero: "03",
    titulo: "Confirma y disfruta",
    desc: "Acuerdan el pago, reciben las indicaciones y solo queda llegar a disfrutar.",
    icono: "🎉",
  },
];

const beneficios = [
  {
    icono: "🔒",
    titulo: "100% Privadas",
    desc: "Todas nuestras fincas son de uso exclusivo. Solo tu grupo, sin extraños.",
  },
  {
    icono: "📍",
    titulo: "Occidente Antioqueño",
    desc: "A menos de 2 horas de Medellín. Clima perfecto, naturaleza pura.",
  },
  {
    icono: "💰",
    titulo: "Precio justo",
    desc: "Desde $180.000/noche. Sin tarifas ocultas ni sorpresas al llegar.",
  },
  {
    icono: "📲",
    titulo: "Reserva directa",
    desc: "Sin intermediarios. Hablas directamente con nosotros por WhatsApp.",
  },
  {
    icono: "🏊",
    titulo: "Piscina incluida",
    desc: "La mayoría de nuestras fincas cuentan con piscina privada.",
  },
  {
    icono: "⭐",
    titulo: "Experiencia verificada",
    desc: "Más de 3 años conectando familias con el campo antioqueño.",
  },
];

export default async function HomePage() {
  let destacadas: FincaAPI[] = [];
  try {
    const rows = await prisma.finca.findMany({
      where: { destacada: true },
      orderBy: { id: "asc" },
      take: 3,
    });
    destacadas = rows.map(parseFinca);
  } catch {}

  return (
    <main style={{ color: "#333333" }}>

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative flex items-center justify-center text-white overflow-hidden"
        style={{
          minHeight: "calc(100vh - 64px)",
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.65) 100%), url(/FONDO-BACK.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative text-center px-4 max-w-4xl mx-auto">
          {/* Pill */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold mb-6"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.3)" }}>
            <span style={{ color: "#FFD93D" }}>✦</span>
            Occidente Antioqueño · Colombia
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-5 leading-tight">
            Tu próximo escape<br />
            <span style={{ color: "#6BCB77" }}>te está esperando</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl mb-10 text-white/85 max-w-2xl mx-auto leading-relaxed">
            Fincas privadas con piscina, BBQ y naturaleza pura.<br className="hidden sm:block" />
            A 90 minutos de Medellín. Reserva directa por WhatsApp — sin formularios, sin esperas.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={WA_HERO}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-uiverse-wa"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Consultar disponibilidad
            </a>
            <Link
              href="/fincas"
              className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-lg transition-all"
              style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.5)", color: "#fff", backdropFilter: "blur(8px)" }}
            >
              Ver fincas
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS DE CONFIANZA
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { valor: "+50", label: "Familias felices", sub: "que ya repitieron" },
              { valor: "+11", label: "Municipios", sub: "en el occidente antioqueño" },
              { valor: "4.9★", label: "Calificación promedio", sub: "en todas las estadías" },
              { valor: "< 10 min", label: "Tiempo de respuesta", sub: "por WhatsApp" },
            ].map((s) => (
              <div key={s.label} className="group">
                <p className="text-3xl sm:text-4xl font-bold" style={{ color: "#2DAAE1" }}>{s.valor}</p>
                <p className="text-sm font-semibold text-gray-700 mt-1">{s.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 pt-8 border-t border-gray-100">
            {[
              { icon: "🔒", text: "Pago seguro acordado directamente" },
              { icon: "📸", text: "Fotos reales, sin filtros" },
              { icon: "✅", text: "Fincas verificadas personalmente" },
              { icon: "🚫", text: "Sin intermediarios ni comisiones" },
            ].map((b) => (
              <div key={b.text} className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
                <span>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CÓMO FUNCIONA
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20" style={{ background: "#F5F5F5" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#2DAAE1" }}>Simple y rápido</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "#333333" }}>¿Cómo reservar?</h2>
            <p className="mt-3 text-gray-500 max-w-lg mx-auto">En menos de 10 minutos puedes tener tu finca confirmada.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pasos.map((paso, i) => (
              <div key={paso.numero} className="relative bg-white rounded-2xl p-8 shadow-sm text-center">
                {i < pasos.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 text-gray-300 text-2xl z-10">→</div>
                )}
                <div className="text-5xl mb-4">{paso.icono}</div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "#6BCB77" }}>{paso.numero}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "#333333" }}>{paso.titulo}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{paso.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href={WA_HERO}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-uiverse-wa"
            >
              <WhatsAppIcon />
              Empezar ahora
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FINCAS DESTACADAS
      ══════════════════════════════════════════════════════ */}
      {destacadas.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#2DAAE1" }}>Las más solicitadas</p>
                <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "#333333" }}>Fincas destacadas</h2>
              </div>
              <Link
                href="/fincas"
                className="text-sm font-semibold flex items-center gap-1 transition-colors"
                style={{ color: "#2DAAE1" }}
              >
                Ver todas →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {destacadas.map((finca) => (
                <CardFinca key={finca.id} finca={finca} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════════════════
          BENEFICIOS
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20" style={{ background: "#F5F5F5" }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#2DAAE1" }}>¿Por qué elegirnos?</p>
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: "#333333" }}>Lo que nos diferencia</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficios.map((b) => (
              <div key={b.titulo} className="bg-white rounded-2xl p-6 flex gap-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl flex-shrink-0">{b.icono}</div>
                <div>
                  <h3 className="font-bold text-base mb-1" style={{ color: "#333333" }}>{b.titulo}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          TESTIMONIOS
      ══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: "#2DAAE1" }}>Opiniones reales</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "#333333" }}>
              Lo que dicen quienes ya fueron
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              No somos perfectos, pero sí consistentes. Estas son experiencias reales de familias y grupos que confiaron en nosotros.
            </p>
          </div>

          {/* Featured testimonial */}
          <div className="rounded-2xl p-8 mb-6 border-2 relative overflow-hidden" style={{ borderColor: "#2DAAE1", background: "#f0f9ff" }}>
            <div className="absolute top-4 right-6 text-7xl opacity-10 font-serif" style={{ color: "#2DAAE1" }}>"</div>
            <div className="flex mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} style={{ color: "#FFD93D" }} className="text-xl">★</span>
              ))}
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-5 max-w-3xl font-medium">
              "{testimonios[0].texto}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold" style={{ background: "#2DAAE1" }}>
                {testimonios[0].iniciales}
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#333333" }}>{testimonios[0].nombre}</p>
                <p className="text-xs text-gray-400">{testimonios[0].lugar} · {testimonios[0].tag}</p>
              </div>
            </div>
          </div>

          {/* Grid de 4 testimonios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {testimonios.slice(1).map((t) => (
              <div key={t.nombre} className="rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white">
                <div className="flex mb-2">
                  {Array.from({ length: t.estrellas }).map((_, i) => (
                    <span key={i} style={{ color: "#FFD93D" }}>★</span>
                  ))}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">"{t.texto}"</p>
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ background: "#6BCB77" }}>
                      {t.iniciales}
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: "#333333" }}>{t.nombre}</p>
                      <p className="text-xs text-gray-400">{t.tag}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social proof bar */}
          <div className="mt-10 rounded-2xl p-6 text-center border border-gray-100" style={{ background: "#F5F5F5" }}>
            <p className="text-gray-500 text-sm mb-1">¿Tienes dudas? Es normal.</p>
            <p className="font-bold text-base mb-4" style={{ color: "#333333" }}>
              Escríbenos y te respondemos sin compromiso — en minutos, no en días.
            </p>
            <a
              href={WA_HERO}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-uiverse-wa"
            >
              <WhatsAppIcon className="w-4 h-4" />
              Hacer una pregunta — sin compromiso
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA FINAL
      ══════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 text-white text-center" style={{ background: "#2DAAE1" }}>
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-5xl mb-4">🌿</div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            El fin de semana que<br />siempre prometiste.
          </h2>
          <p className="text-white/80 text-lg mb-3 leading-relaxed">
            Escríbenos ahora — en minutos te enviamos fincas disponibles con fotos y precios reales.
          </p>
          <p className="text-white/60 text-sm mb-8">
            Sin pagos por adelantado · Sin formularios · Solo WhatsApp
          </p>
          <a
            href={WA_FINAL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-uiverse-wa"
            style={{ fontSize: "15px", padding: "1.3em 3em" }}
          >
            <WhatsAppIcon className="w-6 h-6" />
            Sí, quiero escaparme
          </a>
          <p className="text-white/60 text-sm mt-4">
            También puedes escribirnos al correo:{" "}
            <a href={`mailto:${WHATSAPP_EMAIL}`} className="underline text-white/80">{WHATSAPP_EMAIL}</a>
          </p>
        </div>
      </section>

    </main>
  );
}
