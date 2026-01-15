import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdaperType, DatabaseClient } from '@repo/db';

@Injectable()
export class DatabaseService
  extends DatabaseClient
  implements OnModuleDestroy, OnModuleInit
{
  constructor(private readonly configService: ConfigService) {
    const connectionString = configService.get<string>('DATABASE_URL');
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set in environment');
    }

    super({
      adapter: DatabaseClient.createAdapter(
        AdaperType.Postgres,
        connectionString,
      ),
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async onModuleInit() {
    await this.$connect();
  }
}
