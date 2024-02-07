import { PrismaClient } from "@prisma/client";

import { PrismaInstance } from "../../types/prismaInstance";

export class PrismaInstaceClient implements PrismaInstance {
  createPrismaClient(): PrismaClient {
    return new PrismaClient();
  }
}
