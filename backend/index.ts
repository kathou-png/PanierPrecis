import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const device = "hello";
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
