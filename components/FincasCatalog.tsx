"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { SECTORES } from "@/data/fincas";
import CardFinca from "@/components/CardFinca";
import { FincaAPI } from "@/types/finca";

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
  const [soloPiscina, setSoloPiscina] = useState(false);
  const sectorRef = useRef<HTMLDivElement>(null);

  // Sync sector from URL param on load
  useEffect(() => {
    const s = searchParams.get("sector") ?? "";
    setSectorActivo(s);
  }, [searchParams]);

  // Fetch fincas from API
  useEffect(() => {
    const fetchFincas = async () => {
      try {
        const res = await fetch("/api/fincas");
        const data = await res.json();
        setAllFincas(data);
      } catch (error) {
        console.error("Error fetching fincas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFincas();
  }, []);

  // Close sector dropdown on outside click
  useEffect(() => {
    if (!sectorOpen) return;
    const handler = (e: MouseEvent) => {
      if (sectorRef.current && !sectorRef.current.contains(e.target as Node)) {
        setSectorOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [sectorOpen]);

  // ── Filtered fincas ───────────────────────────────────────────────────────
  const filtradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return allFincas.filter((f) => {
      if (f.precio > precioMax) return false;
      if (f.capacidad < personasMin) return false;
      if (soloPiscina && !f.servicios.includes("Piscina")) return false;
      if (sectorActivo && f.ubicacion !== sectorActivo) return false;
      if (q) {
        const matchNombre = f.nombre.toLowerCase().includes(q);
        if (!matchNombre) return false;
      }
      return true;
    });
  }, [busqueda, precioMax, personasMin, soloPiscina, sectorActivo, allFincas]);

  const hayFiltros =
    busqueda !== "" ||
    precioMax < 500000 ||
    personasMin > 1 ||
    soloPiscina ||
    sectorActivo !== "";

  const resetFiltros = () => {
    setBusqueda("");
    setPrecioMax(500000);
    setPersonasMin(1);
    setSoloPiscina(false);
    setSectorActivo("");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* ── Page header ── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {sectorActivo ? sectorActivo : "Todas las Fincas"}
          </h1>
          <p className="mt-1.5 text-gray-500">
            {filtradas.length} finca{filtradas.length !== 1 ? "s" : ""}{" "}
            encontrada{filtradas.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* ── Search bar ── */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative max-w-xl">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Buscar por nombre o código (ej: La Esperanza, MF-001)"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 transition-all"
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Filters sidebar ── */}
          <aside className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-20">
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-bold text-lg text-gray-900">Filtros</h2>
                {hayFiltros && (
                  <button
                    onClick={resetFiltros}
                    className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors flex items-center gap-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Limpiar todo
                  </button>
                )}
              </div>

              {/* ── Sector dropdown ── */}
              <div className="mb-6" ref={sectorRef}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sector / Municipio
                </label>
                <div className="relative">
                  <button
                    onClick={() => setSectorOpen((o) => !o)}
                    className={`w-full flex justify-between items-center border rounded-xl px-4 py-2.5 text-sm text-left transition-all focus:outline-none focus:ring-2 focus:ring-green-500 ${
                      sectorActivo
                        ? "border-green-500 bg-green-50 text-green-700 font-medium"
                        : "border-gray-200 bg-white text-gray-700 hover:border-green-400"
                    }`}
                  >
                    <span>{sectorActivo || "Todos los sectores"}</span>
                    <svg
                      className={`w-4 h-4 flex-shrink-0 transition-transform ${sectorOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {sectorOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden max-h-64 overflow-y-auto">
                      <button
                        onClick={() => { setSectorActivo(""); setSectorOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm font-semibold transition-colors ${
                          !sectorActivo ? "bg-green-50 text-green-700" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        Todos los sectores
                      </button>
                      <div className="border-t border-gray-100" />
                      {SECTORES.map((sector) => {
                        const count = allFincas.filter((f) => f.ubicacion === sector).length;
                        return (
                          <button
                            key={sector}
                            onClick={() => { setSectorActivo(sector); setSectorOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm flex justify-between items-center transition-colors ${
                              sectorActivo === sector
                                ? "bg-green-50 text-green-700 font-medium"
                                : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <span>{sector}</span>
                            {count > 0 && (
                              <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
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

              {/* ── Price slider ── */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio máximo por noche
                </label>
                <p className="text-green-700 font-bold text-lg mb-2">
                  ${precioMax.toLocaleString("es-CO")}
                </p>
                <input
                  type="range"
                  min={100000}
                  max={500000}
                  step={50000}
                  value={precioMax}
                  onChange={(e) => setPrecioMax(Number(e.target.value))}
                  className="w-full accent-green-600 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>$100.000</span>
                  <span>$500.000</span>
                </div>
              </div>

              {/* ── Persons ── */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacidad mínima
                </label>
                <select
                  value={personasMin}
                  onChange={(e) => setPersonasMin(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
                >
                  {[1, 2, 4, 6, 8, 10, 12, 15].map((n) => (
                    <option key={n} value={n}>
                      {n}+ personas
                    </option>
                  ))}
                </select>
              </div>

              {/* ── Pool ── */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${
                      soloPiscina
                        ? "bg-green-600 border-green-600"
                        : "border-gray-300 group-hover:border-green-400"
                    }`}
                    onClick={() => setSoloPiscina((v) => !v)}
                  >
                    {soloPiscina && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-700 select-none">
                    Solo fincas con piscina 🏊
                  </span>
                </label>
              </div>
            </div>
          </aside>

          {/* ── Finca grid ── */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-6xl mb-4">⏳</span>
                <p className="text-gray-500">Cargando fincas...</p>
              </div>
            ) : (
              <>
            {/* Active filters chips */}
            {hayFiltros && (
              <div className="flex flex-wrap gap-2 mb-5">
                {sectorActivo && (
                  <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full">
                    📍 {sectorActivo}
                    <button onClick={() => setSectorActivo("")} className="hover:text-green-900">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {busqueda && (
                  <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-full">
                    🔍 &ldquo;{busqueda}&rdquo;
                    <button onClick={() => setBusqueda("")} className="hover:text-blue-900">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {precioMax < 500000 && (
                  <span className="inline-flex items-center gap-1.5 bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1.5 rounded-full">
                    💰 Hasta ${precioMax.toLocaleString("es-CO")}
                    <button onClick={() => setPrecioMax(500000)} className="hover:text-yellow-900">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {soloPiscina && (
                  <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-full">
                    🏊 Con piscina
                    <button onClick={() => setSoloPiscina(false)} className="hover:text-blue-900">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            )}

            {filtradas.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtradas.map((finca) => (
                  <CardFinca key={finca.id} finca={finca} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <span className="text-6xl mb-4">🌿</span>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Sin resultados
                </h3>
                <p className="text-gray-400 mb-6 max-w-xs">
                  No encontramos fincas con esos filtros. Prueba cambiando la búsqueda o el sector.
                </p>
                <button
                  onClick={resetFiltros}
                  className="bg-green-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
