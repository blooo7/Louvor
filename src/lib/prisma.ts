import { PrismaClient } from "@prisma/client";

// Ensure we reuse a single PrismaClient instance in dev to avoid
// exhausting database connections when hot reloading.
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
