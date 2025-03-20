import models from "../src/models/index.js";
import { hashSync, genSaltSync } from "bcryptjs";
import auth from "../src/config/auth.js";
import dotenv from "dotenv/config.js";
const { admins } = models;
export default async function seedAdmins() {
  console.log("🌱 Seeding Admins...");

  const password = process.env.PASSWORD_ADMIN;
  if (!password) {
    throw new Error("❌ ERROR: PASSWORD_ADMIN no está definida en el .env");
  }

  let passwordHash = hashSync(password, genSaltSync(auth.rounds));

  await admins.bulkCreate([
    {
      id: 1,
      name: "admin",
      email: "admin@example.com",
      celphone: "923456789",
      dni: "12345678",
      password: passwordHash,
      status: true,
      last_name: "admin",
      address: "Calle 123",
    },
  ]);

  console.log("✅ Admins seeded successfully!");
}
