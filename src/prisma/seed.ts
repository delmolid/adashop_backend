// src\prisma\seed.ts

// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const data = Array.from({ length: 50 }).map(() => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
  }));

  for (const item of data) {
    await prisma.item.create({ data: item });
  }

  console.log(`🌱 Seeded ${data.length} items`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
