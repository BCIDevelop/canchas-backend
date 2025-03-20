console.log("🚀 Seeder script iniciado...");

import fs from "fs";
import path from "path";
const order = [
  "users.seed.js",
  "admins.seed.js",
  "instalaciones.seed.js",
  "tipos.seed.js",
  "canchas.seed.js",
  "deportes.seed.js",
  "reservas.seed.js",
  "cancha_deporte.seed.js",
];
async function runSeeders() {
  for (const file of order) {
    const { default: seeder } = await import(path.join(__dirname, file));
    console.log(seeder);
    if (typeof seeder === "function") {
      await seeder();
    }
  }
}

/* order.forEach((file) => {
  const seeder = require(path.join(__dirname, file));
  if (typeof seeder === "function") {
    seeder();
  }
}); */
runSeeders().catch(console.error);
