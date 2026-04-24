"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/data/fincas";

interface Slide {
  id: number;
  src: string;
  badge: string;
  titulo: string;
  subtitulo: string;
  waMsg: string;
  href: string;
}

// Reemplaza estas URLs con fotos reales de tus fincas
const SLIDES: Slide[] = [
  {
    id: 1,
    src: "https://picsum.photos/seed/finca-piscina/1600/900",
    badge: "🏊 Piscina privada",
    titulo: "Días de piscina, noches de fogón",
    subtitulo: "San Jerónimo · Hasta 15 personas",
    waMsg: "Hola 👋 Vi las fotos de las fincas con piscina y me interesa. ¿Tienen disponibilidad?",
    href: "/fincas",
  },
  {
    id: 2,
    src: "https://picsum.photos/seed/finca-campo/1600/900",
    badge: "🌿 Campo antioqueño",
    titulo: "El silencio que tanto necesitabas",
    subtitulo: "Sopetrán · Hasta 10 personas",
    waMsg: "Hola 👋 Estoy interesado en una finca para descansar en familia. ¿Pueden asesorarme?",
    href: "/fincas",
  },
  {
    id: 3,
    src: "https://picsum.photos/seed/finca-bbq/1600/900",
    badge: "🔥 BBQ incluido",
    titulo: "El plan perfecto con tus amigos",
    subtitulo: "Santa Fe de Antioquia · Hasta 20 personas",
    waMsg: "Hola 👋 Busco una finca grande para un grupo de amigos. ¿Qué tienen disponible?",
    href: "/fincas",
  },
  {
    id: 4,
    src: "https://picsum.photos/seed/finca-rio/1600/900",
    badge: "🏞️ Río cercano",
    titulo: "Naturaleza pura a 90 minutos",
    subtitulo: "Liborina · Hasta 8 personas",
    waMsg: "Hola 👋 Me interesan las fincas cerca al río. ¿Tienen disponibilidad?",
    href: "/fincas",
  },
];

const AUTOPLAY_MS = 5000;

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function CarruselFincas() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const touchStartX = useRef(0);
  const total = SLIDES.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  // Autoplay
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setDragging(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!dragging) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
    setDragging(false);
  };

  const slide = SLIDES[current];

  return (
    <section className="py-16 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-2"
            style={{ color: "#2DAAE1" }}
          >
            En imágenes
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: "#333333", fontFamily: "var(--font-playfair)" }}
          >
            Así se vive en nuestras fincas
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            Más que fotos — son experiencias reales esperando por ti.
          </p>
        </div>

        {/* Carousel container */}
        <div
          className="relative rounded-2xl overflow-hidden shadow-2xl select-none"
          style={{ height: "clamp(320px, 55vw, 580px)" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Slides */}
          {SLIDES.map((s, i) => (
            <div
              key={s.id}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
            >
              {/* Background image */}
              <img
                src={s.src}
                alt={s.titulo}
                className="w-full h-full object-cover"
                style={{
                  transform: i === current ? "scale(1.03)" : "scale(1)",
                  transition: "transform 6s ease",
                }}
                draggable={false}
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.05) 100%)",
                }}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-10">
                {/* Badge */}
                <span
                  className="inline-block text-white text-xs font-semibold px-3 py-1 rounded-full mb-3"
                  style={{ background: "rgba(255,255,255,0.20)", backdropFilter: "blur(8px)" }}
                >
                  {s.badge}
                </span>

                {/* Title */}
                <h3
                  className="text-white text-2xl sm:text-4xl font-bold mb-1 leading-tight"
                  style={{ fontFamily: "var(--font-playfair)", fontStyle: "italic" }}
                >
                  {s.titulo}
                </h3>

                {/* Subtitle */}
                <p className="text-white/70 text-sm sm:text-base mb-5">{s.subtitulo}</p>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(s.waMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:opacity-90 active:scale-95"
                    style={{ background: "#25D366" }}
                  >
                    <WhatsAppIcon />
                    Cotizar ahora
                  </a>
                  <Link
                    href={s.href}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:opacity-90"
                    style={{
                      background: "rgba(255,255,255,0.18)",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.35)",
                      color: "#fff",
                    }}
                  >
                    Ver fincas →
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {/* Arrow: Prev */}
          <button
            onClick={prev}
            aria-label="Anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-white transition-all hover:scale-110 active:scale-95"
            style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(6px)" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Arrow: Next */}
          <button
            onClick={next}
            aria-label="Siguiente"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-white transition-all hover:scale-110 active:scale-95"
            style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(6px)" }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Progress bar */}
          <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-white/10">
            <div
              className="h-full"
              style={{
                width: `${((current + 1) / total) * 100}%`,
                background: "#FF5A5F",
                transition: "width 0.4s ease",
              }}
            />
          </div>

          {/* Dots */}
          <div className="absolute bottom-5 right-6 z-20 flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Ir al slide ${i + 1}`}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? "24px" : "8px",
                  height: "8px",
                  background: i === current ? "#FF5A5F" : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </div>

          {/* Slide counter */}
          <div
            className="absolute top-4 right-4 z-20 text-white/60 text-xs font-semibold"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {current + 1} / {total}
          </div>
        </div>

        {/* Thumbnail strip — desktop only */}
        <div className="hidden sm:flex gap-3 mt-4">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setCurrent(i)}
              className="flex-1 overflow-hidden rounded-xl transition-all duration-300"
              style={{
                height: "72px",
                opacity: i === current ? 1 : 0.5,
                outline: i === current ? "2px solid #FF5A5F" : "2px solid transparent",
                outlineOffset: "2px",
              }}
            >
              <img
                src={s.src}
                alt={s.titulo}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
