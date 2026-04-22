import { Suspense } from "react";
import type { Metadata } from "next";
import FincasCatalog from "@/components/FincasCatalog";

export const metadata: Metadata = {
  title: "Fincas disponibles — Mundo Fincas",
  description:
    "Explora todas las fincas disponibles en el occidente antioqueño. Filtra por sector, precio, capacidad y más.",
};

export default function FincasPage() {
  return (
    <Suspense>
      <FincasCatalog />
    </Suspense>
  );
}
