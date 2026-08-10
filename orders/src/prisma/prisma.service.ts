
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { envs } from 'src/config';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
    const adapter = new PrismaPg({ connectionString: envs.databaseurl });
    super({ adapter });
  }
}
