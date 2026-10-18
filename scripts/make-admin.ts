// ใช้งาน: npm run make-admin -- someone@example.com
import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../app/generated/prisma/client";

async function main() {
  const email = process.argv[2]?.trim().toLowerCase();

  if (!email) {
    console.error("กรุณาระบุอีเมล: npm run make-admin -- someone@example.com");
    process.exit(1);
  }

  const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { role: "ADMIN" },
    });
    console.log(`✅ ${user.email} ตอนนี้เป็น ADMIN แล้ว`);
  } catch {
    console.error(`❌ ไม่พบผู้ใช้อีเมล ${email}`);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
}

main();
