console.log("🚀 Seeder script iniciado...");

import fs from "fs";
import path from "path";
const order = [
  "users.seed.js",
  "instalaciones.seed.js",
  "deportes.seed.js",
  "tipos.seed.js",
  "canchas.seed.js",
  "reservas.seed.js",
  "cancha_deporte.seed.js",
];
order.forEach((file) => {
  const seeder = require(path.join(__dirname, file));
  if (typeof seeder === "function") {
    seeder();
  }
});
