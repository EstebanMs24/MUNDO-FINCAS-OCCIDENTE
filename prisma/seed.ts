import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fincasData = [
  {
    nombre: "La Esperanza",
    ubicacion: "Santa Fe de Antioquia",
    precio: 350000,
    capacidad: 12,
    imagenes: [
      "https://picsum.photos/seed/esp-1/1200/800",
      "https://picsum.photos/seed/esp-2/1200/800",
      "https://picsum.photos/seed/esp-3/1200/800",
      "https://picsum.photos/seed/esp-4/1200/800",
    ],
    descripcion:
      "La Esperanza es una hermosa finca ubicada en el corazón de Santa Fe de Antioquia, rodeada de naturaleza exuberante y con vistas panorámicas al río Cauca. Perfecta para reuniones familiares y eventos especiales, cuenta con todas las comodidades para hacer de su estadía una experiencia inolvidable en el occidente antioqueño.",
    servicios: [
      "Piscina",
      "WiFi",
      "BBQ",
      "Cocina equipada",
      "Parqueadero",
      "TV",
      "Hamacas",
      "Jardín",
      "Zona de fogón",
      "Cancha de fútbol",
    ],
    destacada: true,
  },
  {
    nombre: "El Paraíso Verde",
    ubicacion: "Sopetrán",
    precio: 280000,
    capacidad: 8,
    imagenes: [
      "https://picsum.photos/seed/par-1/1200/800",
      "https://picsum.photos/seed/par-2/1200/800",
      "https://picsum.photos/seed/par-3/1200/800",
    ],
    descripcion:
      "El Paraíso Verde es un refugio de paz y tranquilidad en el municipio de Sopetrán. Rodeada de árboles frutales y con un ambiente familiar único, esta finca es ideal para quienes buscan descansar y reconectarse con la naturaleza del occidente antioqueño.",
    servicios: [
      "Piscina",
      "WiFi",
      "BBQ",
      "Cocina equipada",
      "Hamacas",
      "Río cercano",
      "Zona de fogón",
    ],
    destacada: true,
  },
  {
    nombre: "Villa Antioquia",
    ubicacion: "Olaya",
    precio: 420000,
    capacidad: 15,
    imagenes: [
      "https://picsum.photos/seed/vil-1/1200/800",
      "https://picsum.photos/seed/vil-2/1200/800",
      "https://picsum.photos/seed/vil-3/1200/800",
      "https://picsum.photos/seed/vil-4/1200/800",
    ],
    descripcion:
      "Villa Antioquia es la opción perfecta para grandes grupos y eventos. Con amplia capacidad y múltiples espacios de entretenimiento, esta finca ofrece todo lo que necesitas para una celebración memorable en el occidente antioqueño.",
    servicios: [
      "Piscina",
      "WiFi",
      "BBQ",
      "Cocina equipada",
      "Parqueadero",
      "TV",
      "Cancha de fútbol",
      "Zona de fogón",
      "Billar",
      "Ping pong",
    ],
    destacada: true,
  },
  {
    nombre: "El Descanso Real",
    ubicacion: "Buriticá",
    precio: 220000,
    capacidad: 6,
    imagenes: [
      "https://picsum.photos/seed/des-1/1200/800",
      "https://picsum.photos/seed/des-2/1200/800",
      "https://picsum.photos/seed/des-3/1200/800",
    ],
    descripcion:
      "El Descanso Real es una acogedora finca en Buriticá, perfecta para grupos pequeños que buscan privacidad y descanso. Disfruta de la brisa fresca de la montaña, los atardeceres únicos y la tranquilidad del campo antioqueño.",
    servicios: [
      "Piscina",
      "BBQ",
      "Cocina equipada",
      "Hamacas",
      "Jardín",
      "Zona de fogón",
    ],
    destacada: false,
  },
  {
    nombre: "La Montañita",
    ubicacion: "Liborina",
    precio: 190000,
    capacidad: 4,
    imagenes: [
      "https://picsum.photos/seed/mon-1/1200/800",
      "https://picsum.photos/seed/mon-2/1200/800",
      "https://picsum.photos/seed/mon-3/1200/800",
    ],
    descripcion:
      "La Montañita es una encantadora finca en las alturas de Liborina, ideal para parejas y familias pequeñas. Desde sus terrazas se aprecian vistas espectaculares del paisaje antioqueño, con cultivos de café y vegetación nativa.",
    servicios: [
      "BBQ",
      "Cocina equipada",
      "Hamacas",
      "Jardín",
      "Senderos naturales",
    ],
    destacada: false,
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.finca.deleteMany();

  // Insert fincas
  for (const finca of fincasData) {
    const created = await prisma.finca.create({
      data: {
        nombre: finca.nombre,
        descripcion: finca.descripcion,
        precio: finca.precio,
        ubicacion: finca.ubicacion,
        capacidad: finca.capacidad,
        imagenes: JSON.stringify(finca.imagenes),
        servicios: JSON.stringify(finca.servicios),
        destacada: finca.destacada,
      },
    });
    console.log(`✓ Created: ${created.nombre}`);
  }

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

