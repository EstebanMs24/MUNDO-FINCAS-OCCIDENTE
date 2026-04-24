import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const lote = await prisma.lote.findUnique({ where: { id: parseInt(id) } });
    if (!lote) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({
      ...lote,
      imagenes: lote.imagenes ? JSON.parse(lote.imagenes) : [],
      fechaCreacion: lote.fechaCreacion.toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Error fetching lote" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const lote = await prisma.lote.update({
      where: { id: parseInt(id) },
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
    return NextResponse.json({ ...lote, imagenes: body.imagenes ?? [] });
  } catch {
    return NextResponse.json({ error: "Error updating lote" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.lote.delete({ where: { id: parseInt(id) } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Error deleting lote" }, { status: 500 });
  }
}
