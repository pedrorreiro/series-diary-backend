import { PrismaClient } from '@prisma/client';

export interface DatabaseClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export const prisma = new PrismaClient();

export class PrismaClientDatabase implements DatabaseClient {
  private readonly client: PrismaClient;

  constructor() {
    this.client = prisma;
  }

  async connect(): Promise<void> {
    await this.client.$connect();
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
