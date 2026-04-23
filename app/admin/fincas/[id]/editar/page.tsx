"use client";

import FincaForm from "@/components/admin/FincaForm";
import { useEffect, useState } from "react";
import { FincaAPI } from "@/types/finca";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditFincaPage({ params }: Props) {
  const [finca, setFinca] = useState<FincaAPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paramsResolved, setParamsResolved] = useState(false);

  useEffect(() => {
    (async () => {
      const { id } = await params;
      try {
        const res = await fetch(`/api/fincas/${id}`);
        if (!res.ok) throw new Error("Finca no encontrada");
        const data = await res.json();
        setFinca(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
        setParamsResolved(true);
      }
    })();
  }, [params]);

  if (!paramsResolved) return <div>Cargando...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (loading) return <div>Cargando finca...</div>;
  if (!finca) return <div>Finca no encontrada</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Editar: {finca.nombre}</h1>
        <p className="text-gray-500 mt-1">Modifica los detalles de la finca</p>
      </div>

      <FincaForm finca={finca} />
    </div>
  );
}
