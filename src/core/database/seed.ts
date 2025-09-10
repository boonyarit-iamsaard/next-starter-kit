import { seed } from "./seeders";

async function main() {
  try {
    await seed();
    process.exit(0);
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    process.exit(1);
  }
}

await main();
