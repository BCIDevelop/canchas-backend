import models from "../src/models/index.js";
const { servicios } = models;

export default async function seedServicios() {
  console.log("🌱 Seeding Servicios...");

  await servicios.bulkCreate([
    {
      id: 1,
      name: "Servicios Higiénicos",
    },
    {
      id: 2,
      name: "Quiosco",
    },
    {
      id: 3,
      name: "Chalecos",
    },
    {
      id: 4,
      name: "Vestuarios"
    }
  ]);

  console.log("✅ Servicios seeded successfully!");
}
