import models from "../src/models/index.js";
const { deportes } = models;

async function seedDeportes() {
  console.log("🌱 Seeding Deportes...");

  await deportes.bulkCreate([
    {
      id: 1,
      name: "Futbol",
      status: true,
    },
    {
      id: 2,
      name: "Voley",
      status: true,
    },
    {
      id: 3,
      name: "Basquet",
      status: true,
    },
  ]);

  console.log("✅ Deportes seeded successfully!");
}

seedDeportes().catch(console.error);
