import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { parseLote } from "@/types/lote";
import LoteForm from "@/components/admin/LoteForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarLotePage({ params }: Props) {
  const { id } = await params;
  const raw = await prisma.lote.findUnique({ where: { id: parseInt(id) } });
  if (!raw) notFound();
  const lote = parseLote(raw);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Editar Lote</h1>
        <p className="text-gray-500 text-sm mt-1">{lote.nombre}</p>
      </div>
      <LoteForm lote={lote} />
    </div>
  );
}
