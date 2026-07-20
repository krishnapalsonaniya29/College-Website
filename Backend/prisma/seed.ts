import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const exists = await prisma.admin.findUnique({
    where: {
      email: "admin@college.com",
    },
  });

  if (exists) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.admin.create({
    data: {
      name: "Super Admin",
      email: "admin@college.com",
      password: hashedPassword,
    },
  });

  console.log("Admin created");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });