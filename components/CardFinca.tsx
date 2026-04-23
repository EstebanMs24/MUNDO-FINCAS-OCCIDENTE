import Link from "next/link";
import type { FincaAPI } from "@/types/finca";

interface Props {
  finca: FincaAPI;
}

export default function CardFinca({ finca }: Props) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100">
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={finca.imagenes[0]}
          alt={finca.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Price badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-green-700 shadow-sm">
          ${finca.precio.toLocaleString("es-CO")}
          <span className="font-normal text-xs text-gray-500">/noche</span>
        </div>
        {/* Pool badge */}
        {finca.servicios.includes("Piscina") && (
          <div className="absolute top-3 left-3 bg-blue-500/90 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            🏊 Piscina
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-lg text-gray-900 leading-tight">{finca.nombre}</h3>
        </div>
        <p className="text-gray-400 text-sm mb-3 flex items-center gap-1">
          <svg
            className="w-3.5 h-3.5 text-green-500 flex-shrink-0"
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

        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4 text-gray-400"
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
          <span className="text-gray-300">·</span>
          <span>{finca.servicios.length} servicios</span>
        </div>

        <Link
          href={`/fincas/${finca.id}`}
          className="block w-full text-center bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors duration-200"
        >
          Ver detalles
        </Link>
      </div>
    </div>
  );
}
