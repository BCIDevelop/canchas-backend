import models from "../src/models/index.js";
const { tipos } = models;

async function seedTipos() {
  console.log("🌱 Seeding Tipos...");

  await tipos.bulkCreate([
    {
      id: 1,
      name: "Losa",
    },
    {
      id: 2,
      name: "Sintetico",
    },
    {
      id: 3,
      name: "Natural",
    },
  ]);

  console.log("✅ tIPOS seeded successfully!");
}

seedTipos().catch(console.error);
