"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { SECTORES } from "@/data/fincas";
import CardFinca from "@/components/CardFinca";
import { FincaAPI } from "@/types/finca";

const COMODIDADES = [
  { id: "Piscina", label: "Piscina", emoji: "🏊" },
  { id: "WiFi", label: "WiFi", emoji: "📶" },
  { id: "BBQ", label: "BBQ / Fogón", emoji: "🔥" },
  { id: "Parqueadero", label: "Parqueadero", emoji: "🚗" },
  { id: "Cocina equipada", label: "Cocina equipada", emoji: "🍳" },
  { id: "Hamacas", label: "Hamacas", emoji: "🛋️" },
  { id: "Cancha de fútbol", label: "Cancha", emoji: "⚽" },
  { id: "Billar", label: "Billar", emoji: "🎱" },
  { id: "Río cercano", label: "Río cercano", emoji: "🏞️" },
  { id: "TV", label: "TV", emoji: "📺" },
];

const BRAND = {
  blue: "#2DAAE1",
  green: "#6BCB77",
  coral: "#FF5A5F",
  yellow: "#FFD93D",
  dark: "#333333",
};

export default function FincasCatalog() {
  const searchParams = useSearchParams();
  const [allFincas, setAllFincas] = useState<FincaAPI[]>([]);
  const [loading, setLoading] = useState(true);

  // ── Filter state ──────────────────────────────────────────────────────────
  const [busqueda, setBusqueda] = useState("");
  const [sectorActivo, setSectorActivo] = useState(
    () => searchParams.get("sector") ?? ""
  );
  const [sectorOpen, setSectorOpen] = useState(false);
  const [precioMax, setPrecioMax] = useState(500000);
  const [personasMin, setPersonasMin] = useState(1);
  const [comodidadesActivas, setComodidadesActivas] = useState<Set<string>>(new Set());
  const [filtersOpen, setFiltersOpen] = useState(false); // mobile toggle
  const sectorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = searchParams.get("sector") ?? "";
    setSectorActivo(s);
  }, [searchParams]);

  useEffect(() => {
    fetch("/api/fincas")
      .then((r) => r.json())
      .then((data) => setAllFincas(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!sectorOpen) return;
    const handler = (e: MouseEvent) => {
      if (sectorRef.current && !sectorRef.current.contains(e.target as Node))
        setSectorOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [sectorOpen]);

  const toggleComodidad = (id: string) => {
    setComodidadesActivas((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // ── Filtered fincas ───────────────────────────────────────────────────────
  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return allFincas.filter((f) => {
      if (f.precio > precioMax) return false;
      if (f.capacidad < personasMin) return false;
      if (sectorActivo && f.ubicacion !== sectorActivo) return false;
      if (q && !f.nombre.toLowerCase().includes(q)) return false;
      for (const c of comodidadesActivas) {
        if (!f.servicios.includes(c)) return false;
      }
      return true;
    });
  }, [busqueda, precioMax, personasMin, sectorActivo, comodidadesActivas, allFincas]);

  const hayFiltros =
    busqueda !== "" ||
    precioMax < 500000 ||
    personasMin > 1 ||
    comodidadesActivas.size > 0 ||
    sectorActivo !== "";

  const resetFiltros = () => {
    setBusqueda("");
    setPrecioMax(500000);
    setPersonasMin(1);
    setComodidadesActivas(new Set());
    setSectorActivo("");
  };

  // ── Shared styles ─────────────────────────────────────────────────────────
  const inputClass =
    "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 bg-white transition-all";

  const FilterPanel = () => (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-20 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg" style={{ color: BRAND.dark }}>Filtros</h2>
        {hayFiltros && (
          <button
            onClick={resetFiltros}
            className="text-xs font-medium flex items-center gap-1 transition-colors"
            style={{ color: BRAND.coral }}
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Limpiar todo
          </button>
        )}
      </div>

      {/* Sector */}
      <div ref={sectorRef}>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          📍 Municipio
        </label>
        <div className="relative">
          <button
            onClick={() => setSectorOpen((o) => !o)}
            className={`w-full flex justify-between items-center border rounded-xl px-4 py-2.5 text-sm text-left transition-all focus:outline-none ${
              sectorActivo ? "font-semibold" : "text-gray-600 border-gray-200"
            }`}
            style={sectorActivo ? { borderColor: BRAND.blue, color: BRAND.blue, background: "#EFF9FF" } : {}}
          >
            <span>{sectorActivo || "Todos los municipios"}</span>
            <svg
              className={`w-4 h-4 flex-shrink-0 transition-transform ${sectorOpen ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {sectorOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden max-h-64 overflow-y-auto">
              <button
                onClick={() => { setSectorActivo(""); setSectorOpen(false); }}
                className="w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-gray-50"
                style={!sectorActivo ? { color: BRAND.blue, background: "#EFF9FF" } : { color: "#555" }}
              >
                Todos los municipios
              </button>
              <div className="border-t border-gray-100" />
              {SECTORES.map((sector) => {
                const count = allFincas.filter((f) => f.ubicacion === sector).length;
                const active = sectorActivo === sector;
                return (
                  <button
                    key={sector}
                    onClick={() => { setSectorActivo(sector); setSectorOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm flex justify-between items-center transition-colors hover:bg-gray-50"
                    style={active ? { color: BRAND.blue, background: "#EFF9FF", fontWeight: 600 } : { color: "#555" }}
                  >
                    <span>{sector}</span>
                    {count > 0 && (
                      <span
                        className="text-xs font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: "#EFF9FF", color: BRAND.blue }}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Personas */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          👥 Capacidad mínima
        </label>
        <select
          value={personasMin}
          onChange={(e) => setPersonasMin(Number(e.target.value))}
          className={inputClass}
          style={{ outlineColor: BRAND.blue }}
        >
          {[1, 2, 4, 6, 8, 10, 12, 15, 20].map((n) => (
            <option key={n} value={n}>{n}+ personas</option>
          ))}
        </select>
      </div>

      {/* Precio */}
      <div>
        <div className="flex justify-between items-baseline mb-2">
          <label className="text-sm font-semibold text-gray-700">💰 Precio máximo/noche</label>
          <span className="text-sm font-bold" style={{ color: BRAND.blue }}>
            ${precioMax.toLocaleString("es-CO")}
          </span>
        </div>
        <input
          type="range"
          min={100000}
          max={500000}
          step={50000}
          value={precioMax}
          onChange={(e) => setPrecioMax(Number(e.target.value))}
          className="w-full cursor-pointer"
          style={{ accentColor: BRAND.blue }}
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>$100.000</span>
          <span>$500.000+</span>
        </div>
      </div>

      {/* Comodidades */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          ✨ Comodidades
        </label>
        <div className="space-y-2">
          {COMODIDADES.map(({ id, label, emoji }) => {
            const active = comodidadesActivas.has(id);
            return (
              <button
                key={id}
                onClick={() => toggleComodidad(id)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all border text-left"
                style={
                  active
                    ? { borderColor: BRAND.blue, background: "#EFF9FF", color: BRAND.blue, fontWeight: 600 }
                    : { borderColor: "#e5e7eb", background: "transparent", color: "#555" }
                }
              >
                <span className="text-base flex-shrink-0">{emoji}</span>
                <span>{label}</span>
                {active && (
                  <svg className="w-4 h-4 ml-auto flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: BRAND.blue }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background: "#F5F5F5" }}>
      {/* Page header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: BRAND.dark }}>
                {sectorActivo ? sectorActivo : "Todas las Fincas"}
              </h1>
              <p className="mt-1 text-gray-500 text-sm">
                {loading ? "Cargando..." : `${filtradas.length} finca${filtradas.length !== 1 ? "s" : ""} encontrada${filtradas.length !== 1 ? "s" : ""}`}
              </p>
            </div>
            {/* Mobile filter toggle */}
            <button
              onClick={() => setFiltersOpen((o) => !o)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all"
              style={
                hayFiltros
                  ? { borderColor: BRAND.blue, color: BRAND.blue, background: "#EFF9FF" }
                  : { borderColor: "#e5e7eb", color: "#555" }
              }
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
              Filtros
              {hayFiltros && (
                <span className="w-5 h-5 flex items-center justify-center text-white text-xs rounded-full font-bold" style={{ background: BRAND.blue }}>
                  {(sectorActivo ? 1 : 0) + (precioMax < 500000 ? 1 : 0) + (personasMin > 1 ? 1 : 0) + comodidadesActivas.size + (busqueda ? 1 : 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative max-w-xl">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre de finca..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 bg-white transition-all"
              style={{ color: BRAND.dark }}
            />
            {busqueda && (
              <button onClick={() => setBusqueda("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile filter panel */}
        {filtersOpen && (
          <div className="lg:hidden mb-6">
            <FilterPanel />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop filter sidebar */}
          <aside className="hidden lg:block lg:w-72 flex-shrink-0">
            <FilterPanel />
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {/* Active filter chips */}
            {hayFiltros && (
              <div className="flex flex-wrap gap-2 mb-5">
                {sectorActivo && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "#EFF9FF", color: BRAND.blue }}>
                    📍 {sectorActivo}
                    <button onClick={() => setSectorActivo("")}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </span>
                )}
                {busqueda && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "#EFF9FF", color: BRAND.blue }}>
                    🔍 "{busqueda}"
                    <button onClick={() => setBusqueda("")}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </span>
                )}
                {precioMax < 500000 && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "#FFFBEB", color: "#B45309" }}>
                    💰 Hasta ${precioMax.toLocaleString("es-CO")}
                    <button onClick={() => setPrecioMax(500000)}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </span>
                )}
                {personasMin > 1 && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "#EFF9FF", color: BRAND.blue }}>
                    👥 {personasMin}+ personas
                    <button onClick={() => setPersonasMin(1)}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </span>
                )}
                {Array.from(comodidadesActivas).map((c) => {
                  const com = COMODIDADES.find((x) => x.id === c);
                  return (
                    <span key={c} className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "#EFF9FF", color: BRAND.blue }}>
                      {com?.emoji} {com?.label}
                      <button onClick={() => toggleComodidad(c)}>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    </span>
                  );
                })}
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-10 h-10 border-4 border-gray-200 rounded-full animate-spin mb-4" style={{ borderTopColor: BRAND.blue }} />
                <p className="text-gray-500 text-sm">Cargando fincas...</p>
              </div>
            ) : filtradas.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtradas.map((finca) => (
                  <CardFinca key={finca.id} finca={finca} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-6xl mb-4">🌿</span>
                <h3 className="text-xl font-bold mb-2" style={{ color: BRAND.dark }}>Sin resultados</h3>
                <p className="text-gray-400 mb-6 max-w-xs">
                  No encontramos fincas con esos filtros. Prueba con otras opciones o contáctanos directamente.
                </p>
                <div className="flex gap-3 flex-wrap justify-center">
                  <button
                    onClick={resetFiltros}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-colors"
                    style={{ background: BRAND.blue }}
                  >
                    Limpiar filtros
                  </button>
                  <a
                    href={`https://wa.me/573113726248?text=${encodeURIComponent("Hola 👋 Busco una finca para mi grupo. ¿Pueden ayudarme?")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-colors"
                    style={{ background: "#25D366" }}
                  >
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
