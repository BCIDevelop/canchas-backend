import models from "../src/models/index.js";
const { prices } = models;

export default async function seedPrices() {
  console.log("🌱 Seeding Prices...");

  await prices.bulkCreate([
    {
      lights: true,
      price: 70,
      players: 6,
      id_tipo: 1,
    },
    {
      lights: false,
      price: 50,
      players: 6,
      id_tipo: 1,
    },
  ]);

  console.log("✅ Prices seeded successfully!");
}
