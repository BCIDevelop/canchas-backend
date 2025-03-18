import models from "../src/models/index.js";
const { canchas } = models;

function getRandomDeportes() {
  const posiblesDeportes = [1, 2, 3];
  const numDeportes = Math.floor(Math.random() * posiblesDeportes.length) + 1;
  return posiblesDeportes.sort(() => 0.5 - Math.random()).slice(0, numDeportes);
}

async function seedCanchasDeportes() {
  console.log("🌱 Seeding CanchasDeportes...");

  const canchasRecords = await canchas.findAll();

  for (const cancha of canchasRecords) {
    const deportesSeleccionados = getRandomDeportes();
    await cancha.addDeportes(deportesSeleccionados); // Agrega los deportes aleatoriamente seleccionados
    console.log(`Cancha ${cancha.id} → Deportes: ${deportesSeleccionados}`);
  }

  console.log("✅ Seeding completado!");
}

seedCanchasDeportes().catch(console.error);
