"use client";

import { useState, useRef, useEffect, startTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SECTORES } from "@/data/fincas";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [fincasOpen, setFincasOpen] = useState(false);
  const [mobileFincasOpen, setMobileFincasOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!fincasOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setFincasOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [fincasOpen]);

  // Close everything on route change (startTransition prevents cascading-render warning)
  useEffect(() => {
    startTransition(() => {
      setMobileOpen(false);
      setFincasOpen(false);
      setMobileFincasOpen(false);
    });
  }, [pathname]);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Mundo Fincas"
              width={38}
              height={38}
              className="rounded-lg object-contain"
            />
            <span className="font-bold text-lg text-green-800 leading-tight">
              Mundo Fincas Occidente
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "text-green-700 bg-green-50"
                  : "text-gray-600 hover:text-green-700 hover:bg-green-50"
              }`}
            >
              Inicio
            </Link>

            <Link
              href="/nosotros"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/nosotros"
                  ? "text-green-700 bg-green-50"
                  : "text-gray-600 hover:text-green-700 hover:bg-green-50"
              }`}
            >
              Nosotros
            </Link>

            {/* Fincas dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setFincasOpen((o) => !o)}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith("/fincas")
                    ? "text-green-700 bg-green-50"
                    : "text-gray-600 hover:text-green-700 hover:bg-green-50"
                }`}
              >
                Fincas
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${fincasOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown panel */}
              {fincasOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 py-2">
                  <Link
                    href="/fincas"
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    Ver todas las fincas
                  </Link>
                  <div className="border-t border-gray-100 my-1" />
                  <p className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Por sector
                  </p>
                  {SECTORES.map((sector) => (
                    <Link
                      key={sector}
                      href={`/fincas?sector=${encodeURIComponent(sector)}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                    >
                      {sector}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contacto"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/contacto"
                  ? "text-green-700 bg-green-50"
                  : "text-gray-600 hover:text-green-700 hover:bg-green-50"
              }`}
            >
              Contacto
            </Link>

            <Link href="/fincas" className="ml-3 btn-reservar">
              Reservar
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label="Menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* ── Mobile menu ── */}
        {mobileOpen && (
          <div className="md:hidden py-3 border-t border-gray-100 flex flex-col gap-0.5">
            <Link
              href="/"
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/" ? "text-green-700 bg-green-50" : "text-gray-600"
              }`}
            >
              Inicio
            </Link>

            <Link
              href="/nosotros"
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/nosotros" ? "text-green-700 bg-green-50" : "text-gray-600"
              }`}
            >
              Nosotros
            </Link>

            {/* Mobile Fincas expandable */}
            <div>
              <button
                onClick={() => setMobileFincasOpen((o) => !o)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname.startsWith("/fincas") ? "text-green-700 bg-green-50" : "text-gray-600"
                }`}
              >
                <span>Fincas</span>
                <svg
                  className={`w-4 h-4 transition-transform ${mobileFincasOpen ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {mobileFincasOpen && (
                <div className="ml-4 mt-1 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                  <Link
                    href="/fincas"
                    className="block px-4 py-2.5 text-sm font-semibold text-green-700 border-b border-gray-100 hover:bg-green-50"
                  >
                    Ver todas las fincas
                  </Link>
                  <p className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    Por sector
                  </p>
                  {SECTORES.map((sector) => (
                    <Link
                      key={sector}
                      href={`/fincas?sector=${encodeURIComponent(sector)}`}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors"
                    >
                      {sector}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contacto"
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/contacto" ? "text-green-700 bg-green-50" : "text-gray-600"
              }`}
            >
              Contacto
            </Link>

            <Link
              href="/fincas"
              className="mt-2 flex items-center justify-center btn-reservar"
              style={{ width: "100%" }}
            >
              Reservar ahora
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
