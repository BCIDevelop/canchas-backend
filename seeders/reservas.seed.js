import models from "../src/models/index.js";
const { reservas } = models;

async function seedReservas() {
  console.log("🌱 Seeding Reservas...");
  const today = new Date();
  const fecha = today.toISOString().split("T")[0];
  await reservas.bulkCreate([
    {
      fecha: fecha,
      hours: [10, 11, 12],
      count_hours: 3,
      id_instalacion: 1,
      id_cancha: 1,
      id_user: 1,
    },
    {
      fecha: fecha,
      hours: [13, 14],
      count_hours: 2,
      id_instalacion: 1,
      id_cancha: 1,
      id_user: 1,
    },
    {
      fecha: fecha,
      hours: [13, 14],
      count_hours: 2,
      id_instalacion: 1,
      id_cancha: 1,
      id_user: 1,
    },
    {
      fecha: fecha,
      hours: [15, 16, 17],
      count_hours: 3,
      id_instalacion: 1,
      id_cancha: 1,
      id_user: 1,
    },
    {
      fecha: fecha,
      hours: [18, 20],
      count_hours: 2,
      id_instalacion: 1,
      id_cancha: 1,
      id_user: 1,
    },
  ]);

  console.log("✅ Reservas seeded successfully!");
}

seedReservas().catch(console.error);
