"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: number;
  nombre: string;
}

export default function DeleteLoteButton({ id, nombre }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`¿Eliminar el lote "${nombre}"? Esta acción no se puede deshacer.`)) return;
    setLoading(true);
    try {
      await fetch(`/api/lotes/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-3 py-1.5 text-xs font-medium bg-red-50 text-red-700 border border-red-100 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50"
    >
      {loading ? "..." : "Eliminar"}
    </button>
  );
}
