import type { Metadata } from "next";
import { WHATSAPP_NUMBER, WHATSAPP_EMAIL } from "@/data/fincas";

export const metadata: Metadata = {
  title: "Contacto — Mundo Fincas",
  description:
    "Contáctanos para reservar tu finca en el occidente antioqueño. WhatsApp, email y redes sociales.",
};

const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hola, quiero información sobre las fincas disponibles."
)}`;

export default function ContactoPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Contáctanos
          </h1>
          <p className="mt-2 text-gray-500">
            Estamos listos para ayudarte a encontrar la finca perfecta.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        {/* WhatsApp + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-[#25D366] hover:shadow-md transition-all text-center block"
          >
            <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-[#25D366]/20 transition-colors">
              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 fill-[#25D366]"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-1">WhatsApp</h3>
            <p className="text-gray-400 text-sm mb-3">Respuesta inmediata</p>
            <p className="font-semibold text-green-700">+57 311 372 6248</p>
          </a>

          <a
            href={`mailto:${WHATSAPP_EMAIL}`}
            className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:border-green-500 hover:shadow-md transition-all text-center block"
          >
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4 group-hover:bg-green-100 transition-colors">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-gray-900 mb-1">Email</h3>
            <p className="text-gray-400 text-sm mb-3">Respuesta en 24 h</p>
            <p className="font-semibold text-green-700 break-all text-sm">
              {WHATSAPP_EMAIL}
            </p>
          </a>
        </div>

        {/* Social media */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <h3 className="font-bold text-xl text-gray-900 mb-2">
            Síguenos en redes sociales
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Descubre fotos, novedades y promociones exclusivas.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://www.instagram.com/mundofincas.co"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity font-semibold text-sm shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @mundofincas.co
            </a>
            <a
              href="https://www.facebook.com/share/1Bb73MaNct/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#1877F2] text-white px-6 py-3 rounded-xl hover:opacity-90 transition-opacity font-semibold text-sm shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Mundo Fincas
            </a>
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
          <div className="text-4xl mb-3">📍</div>
          <h3 className="font-bold text-xl text-gray-900 mb-2">Ubicación</h3>
          <p className="text-gray-600">Occidente Antioqueño, Colombia</p>
          <p className="text-gray-400 text-sm mt-2">
            Santa Fe de Antioquia · Sopetrán · Olaya · Buriticá · Liborina
          </p>
        </div>
      </div>
    </div>
  );
}
