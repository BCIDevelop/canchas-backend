import models from "../src/models/index.js";
import { hashSync, genSaltSync } from "bcryptjs";
import auth from "../src/config/auth.js";
import dotenv from "dotenv/config.js";
const { users } = models;
export default async function seedUsers() {
  console.log("🌱 Seeding Users...");

  const password = process.env.PASSWORD_ADMIN;
  if (!password) {
    throw new Error("❌ ERROR: PASSWORD_ADMIN no está definida en el .env");
  }

  let passwordHash = hashSync(password, genSaltSync(auth.rounds));

  await users.bulkCreate([
    {
      id: 1,
      name: "admin",
      email: "admin@example.com",
      celphone: "923456789",
      dni: "12345678",
      password: passwordHash,
      status: true,
      last_name: "admin",
    },
  ]);

  console.log("✅ Users seeded successfully!");
}
