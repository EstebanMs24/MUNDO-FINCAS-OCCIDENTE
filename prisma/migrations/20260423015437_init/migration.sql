-- CreateTable
CREATE TABLE "Finca" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio" INTEGER NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "imagenes" TEXT NOT NULL DEFAULT '[]',
    "servicios" TEXT NOT NULL DEFAULT '[]',
    "destacada" BOOLEAN NOT NULL DEFAULT false,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Finca_pkey" PRIMARY KEY ("id")
);
