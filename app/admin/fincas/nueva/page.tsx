import FincaForm from "@/components/admin/FincaForm";

export default function NewFincaPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Nueva Finca</h1>
        <p className="text-gray-500 mt-1">Completa el formulario para crear una nueva finca</p>
      </div>

      <FincaForm />
    </div>
  );
}
