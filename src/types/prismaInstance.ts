import { PrismaClient } from "@prisma/client";

export type PrismaInstance = {
  createPrismaClient(): PrismaClient;
};
