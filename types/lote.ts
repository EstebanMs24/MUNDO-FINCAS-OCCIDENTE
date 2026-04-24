export interface LoteAPI {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  ubicacion: string;
  area: number;
  imagenes: string[];
  destacado: boolean;
  fechaCreacion: string;
}

export function parseLote(raw: any): LoteAPI {
  return {
    id: raw.id,
    nombre: raw.nombre,
    descripcion: raw.descripcion,
    precio: raw.precio,
    ubicacion: raw.ubicacion,
    area: raw.area,
    imagenes: raw.imagenes ? JSON.parse(raw.imagenes) : [],
    destacado: raw.destacado,
    fechaCreacion: raw.fechaCreacion?.toISOString?.() ?? raw.fechaCreacion ?? "",
  };
}
