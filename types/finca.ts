export interface FincaAPI {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  ubicacion: string;
  capacidad: number;
  imagenes: string[];
  servicios: string[];
  destacada: boolean;
  fechaCreacion: string;
}

export function parseFinca(raw: {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  ubicacion: string;
  capacidad: number;
  imagenes: string;
  servicios: string;
  destacada: boolean;
  fechaCreacion: Date;
}): FincaAPI {
  return {
    ...raw,
    imagenes: raw.imagenes ? JSON.parse(raw.imagenes) as string[] : [],
    servicios: raw.servicios ? JSON.parse(raw.servicios) as string[] : [],
    fechaCreacion: raw.fechaCreacion.toISOString(),
  };
}
