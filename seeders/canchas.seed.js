import models from "../src/models/index.js";
const { canchas } = models;

async function seedCanchas() {
  console.log("🌱 Seeding Canchas...");

  await canchas.bulkCreate([
    {
      id: 1,
      price_day: 60,
      price_night: 80,
      id_instalacion: 1,
      id_tipo: 1,
    },
    {
      id: 2,
      price_day: 70,
      price_night: 90,
      id_instalacion: 5,
      id_tipo: 2,
    },
    {
      id: 3,
      price_day: 50,
      price_night: 80,
      id_instalacion: 9,
      id_tipo: 1,
    },
    {
      id: 4,
      price_day: 50,
      price_night: 80,
      id_instalacion: 4,
      id_tipo: 2,
    },
    {
      id: 5,
      price_day: 50,
      price_night: 80,
      id_instalacion: 3,
      id_tipo: 3,
    },
    {
      id: 6,
      price_day: 50,
      price_night: 80,
      id_instalacion: 12,
      id_tipo: 1,
    },
    {
      id: 7,
      price_day: 70,
      price_night: 90,
      id_instalacion: 1,
      id_tipo: 1,
    },
    {
      id: 8,
      price_day: 50,
      price_night: 80,
      id_instalacion: 7,
      id_tipo: 2,
    },
    {
      id: 9,
      price_day: 50,
      price_night: 80,
      id_instalacion: 13,
      id_tipo: 1,
    },
    {
      id: 10,
      price_day: 50,
      price_night: 67,
      id_instalacion: 4,
      id_tipo: 2,
    },
    {
      id: 11,
      price_day: 50,
      price_night: 80,
      id_instalacion: 11,
      id_tipo: 3,
    },
    {
      id: 12,
      price_day: 50,
      price_night: 80,
      id_instalacion: 2,
      id_tipo: 1,
    },
    {
      id: 13,
      price_day: 50,
      price_night: 95,
      id_instalacion: 8,
      id_tipo: 1,
    },
    {
      id: 14,
      price_day: 50,
      price_night: 80,
      id_instalacion: 7,
      id_tipo: 2,
    },
    {
      id: 15,
      price_day: 60,
      price_night: 80,
      id_instalacion: 9,
      id_tipo: 1,
    },
    {
      id: 16,
      price_day: 70,
      price_night: 78,
      id_instalacion: 18,
      id_tipo: 2,
    },
    {
      id: 17,
      price_day: 50,
      price_night: 90,
      id_instalacion: 13,
      id_tipo: 3,
    },
    {
      id: 18,
      price_day: 50,
      price_night: 80,
      id_instalacion: 14,
      id_tipo: 1,
    },
    {
      id: 19,
      price_day: 50,
      price_night: 80,
      id_instalacion: 15,
      id_tipo: 2,
    },
    {
      id: 20,
      price_day: 50,
      price_night: 80,
      id_instalacion: 20,
      id_tipo: 3,
    },
    {
      id: 21,
      price_day: 50,
      price_night: 80,
      id_instalacion: 10,
      id_tipo: 1,
    },
    {
      id: 22,
      price_day: 50,
      price_night: 80,
      id_instalacion: 6,
      id_tipo: 2,
    },
    {
      id: 23,
      price_day: 50,
      price_night: 80,
      id_instalacion: 17,
      id_tipo: 1,
    },
    {
      id: 24,
      price_day: 50,
      price_night: 80,
      id_instalacion: 16,
      id_tipo: 2,
    },
    {
      id: 25,
      price_day: 56,
      price_night: 80,
      id_instalacion: 19,
      id_tipo: 3,
    },
    {
      id: 26,
      price_day: 60,
      price_night: 95,
      id_instalacion: 5,
      id_tipo: 3,
    },
  ]);
  console.log("✅ Canchas seeded successfully!");
}

seedCanchas().catch(console.error);
