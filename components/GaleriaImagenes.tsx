"use client";

import { useState } from "react";

interface Props {
  imagenes: string[];
  nombre: string;
}

export default function GaleriaImagenes({ imagenes, nombre }: Props) {
  const [activa, setActiva] = useState(0);

  const prev = () => setActiva((a) => (a - 1 + imagenes.length) % imagenes.length);
  const next = () => setActiva((a) => (a + 1) % imagenes.length);

  return (
    <div>
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden h-72 sm:h-[420px] md:h-[500px] bg-gray-100">
        <img
          src={imagenes[activa]}
          alt={`${nombre} — foto ${activa + 1}`}
          className="w-full h-full object-cover transition-opacity duration-300"
        />

        {imagenes.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all hover:scale-105"
              aria-label="Imagen anterior"
            >
              <svg
                className="w-5 h-5 text-gray-800"
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
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all hover:scale-105"
              aria-label="Imagen siguiente"
            >
              <svg
                className="w-5 h-5 text-gray-800"
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
            </button>
          </>
        )}

        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
          {activa + 1} / {imagenes.length}
        </div>
      </div>

      {/* Thumbnails */}
      {imagenes.length > 1 && (
        <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1">
          {imagenes.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiva(i)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                i === activa
                  ? "border-green-500 opacity-100 scale-[1.05]"
                  : "border-transparent opacity-55 hover:opacity-80"
              }`}
            >
              <img
                src={img}
                alt={`${nombre} miniatura ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
