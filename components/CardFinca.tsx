"use client";

import { useState } from "react";
import Link from "next/link";
import type { FincaAPI } from "@/types/finca";
import CotizarModal from "./CotizarModal";

interface Props {
  finca: FincaAPI;
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function CardFinca({ finca }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
        {/* Image */}
        <div className="relative overflow-hidden h-52">
          {finca.imagenes[0] ? (
            <img
              src={finca.imagenes[0]}
              alt={finca.nombre}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: "#F5F5F5" }}
            >
              <span className="text-5xl">🏡</span>
            </div>
          )}
          {/* Price badge */}
          <div
            className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold shadow-sm"
            style={{ color: "#2DAAE1" }}
          >
            ${finca.precio.toLocaleString("es-CO")}
            <span className="font-normal text-xs text-gray-400">/noche</span>
          </div>
          {/* Pool badge */}
          {finca.servicios.includes("Piscina") && (
            <div
              className="absolute top-3 left-3 text-white text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: "#2DAAE1" }}
            >
              🏊 Piscina
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3
            className="font-bold text-lg leading-tight mb-1"
            style={{ color: "#333333" }}
          >
            {finca.nombre}
          </h3>

          <p className="text-gray-400 text-sm mb-3 flex items-center gap-1">
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              style={{ color: "#6BCB77" }}
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {finca.ubicacion}, Occidente Antioqueño
          </p>

          <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
            <span className="flex items-center gap-1">
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Hasta {finca.capacidad} personas
            </span>
            <span className="text-gray-200">·</span>
            <span>{finca.servicios.length} servicios</span>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/fincas/${finca.id}`}
              className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold transition-colors border"
              style={{ borderColor: "#2DAAE1", color: "#2DAAE1" }}
            >
              Ver finca
            </Link>
            <button
              onClick={() => setShowModal(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#25D366" }}
            >
              <WhatsAppIcon />
              Cotizar
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <CotizarModal
          nombreFinca={finca.nombre}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
