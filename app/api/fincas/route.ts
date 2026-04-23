import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseFinca } from "@/types/finca";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const destacada = searchParams.get("destacada");
    const ubicacion = searchParams.get("ubicacion");

    const where: any = {};
    if (destacada === "true") where.destacada = true;
    if (ubicacion) where.ubicacion = ubicacion;

    const fincas = await prisma.finca.findMany({
      where,
      orderBy: { id: "asc" },
    });

    return Response.json(fincas.map(parseFinca));
  } catch (error) {
    console.error("Error fetching fincas:", error);
    return Response.json(
      { error: "Error fetching fincas" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, descripcion, precio, ubicacion, capacidad, imagenes, servicios, destacada } = body;

    if (!nombre || !descripcion || !precio || !ubicacion || !capacidad) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const finca = await prisma.finca.create({
      data: {
        nombre,
        descripcion,
        precio: parseInt(precio),
        ubicacion,
        capacidad: parseInt(capacidad),
        imagenes: JSON.stringify(imagenes || []),
        servicios: JSON.stringify(servicios || []),
        destacada: destacada ?? false,
      },
    });

    return Response.json(parseFinca(finca), { status: 201 });
  } catch (error) {
    console.error("Error creating finca:", error);
    return Response.json(
      { error: "Error creating finca" },
      { status: 500 }
    );
  }
}
