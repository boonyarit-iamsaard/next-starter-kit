import { db } from "~/core/database";

import { createUsersSeeder } from "./users";

const seeders = [createUsersSeeder({ count: 25, db })];

export async function seed() {
  console.info("🌱 Starting database seeding...");

  for (const seederInstance of seeders) {
    try {
      console.info(`🌱 Seeding ${seederInstance.name}...`);
      const startTime = Date.now();

      await seederInstance.seed();

      const duration = Date.now() - startTime;
      console.info(
        `✅ ${seederInstance.name} seeded successfully (${duration}ms)`,
      );
    } catch (error) {
      console.error(`❌ Failed to seed ${seederInstance.name}:`, error);
      throw error;
    }
  }

  console.log("🎉 Database seeding completed");
}
