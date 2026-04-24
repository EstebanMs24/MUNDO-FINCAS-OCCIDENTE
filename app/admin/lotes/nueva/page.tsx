import LoteForm from "@/components/admin/LoteForm";

export default function NuevoLotePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Nuevo Lote</h1>
        <p className="text-gray-500 text-sm mt-1">Completa el formulario para publicar un lote en venta</p>
      </div>
      <LoteForm />
    </div>
  );
}
