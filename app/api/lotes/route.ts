import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const lotes = await prisma.lote.findMany({
      orderBy: { fechaCreacion: "desc" },
    });
    const parsed = lotes.map((l) => ({
      ...l,
      imagenes: l.imagenes ? JSON.parse(l.imagenes) : [],
      fechaCreacion: l.fechaCreacion.toISOString(),
    }));
    return NextResponse.json(parsed);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching lotes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const lote = await prisma.lote.create({
      data: {
        nombre: body.nombre,
        descripcion: body.descripcion,
        precio: Number(body.precio),
        ubicacion: body.ubicacion,
        area: Number(body.area),
        imagenes: JSON.stringify(body.imagenes ?? []),
        destacado: body.destacado ?? false,
      },
    });
    return NextResponse.json({ ...lote, imagenes: body.imagenes ?? [] }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating lote" }, { status: 500 });
  }
}
