import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseFinca } from "@/types/finca";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const finca = await prisma.finca.findUnique({
      where: { id: parseInt(id) },
    });

    if (!finca) {
      return Response.json({ error: "Finca not found" }, { status: 404 });
    }

    return Response.json(parseFinca(finca));
  } catch (error) {
    console.error("Error fetching finca:", error);
    return Response.json(
      { error: "Error fetching finca" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { nombre, descripcion, precio, ubicacion, capacidad, imagenes, servicios, destacada } = body;

    const finca = await prisma.finca.update({
      where: { id: parseInt(id) },
      data: {
        ...(nombre && { nombre }),
        ...(descripcion && { descripcion }),
        ...(precio && { precio: parseInt(precio) }),
        ...(ubicacion && { ubicacion }),
        ...(capacidad && { capacidad: parseInt(capacidad) }),
        ...(imagenes && { imagenes: JSON.stringify(imagenes) }),
        ...(servicios && { servicios: JSON.stringify(servicios) }),
        ...(destacada !== undefined && { destacada }),
      },
    });

    return Response.json(parseFinca(finca));
  } catch (error) {
    console.error("Error updating finca:", error);
    return Response.json(
      { error: "Error updating finca" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.finca.delete({
      where: { id: parseInt(id) },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting finca:", error);
    return Response.json(
      { error: "Error deleting finca" },
      { status: 500 }
    );
  }
}
