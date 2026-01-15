import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

export enum AdaperType {
  Postgres,
}

export class DatabaseClient extends PrismaClient {
  /**
   * Helper to create adapters from a type and a connection string.
   * This keeps adapter construction local to runtime code
   * where envs are available (e.g. using `ConfigService`).
   * Instead of constructing at import-time which leads to missing DB_URL
   */
  static createAdapter(type: AdaperType, connectionString: string) {
    switch (type) {
      case AdaperType.Postgres:
        return new PrismaPg({ connectionString });
      default:
        throw new Error(
          `Invdalid Database adapter type. Expected: ${Object.entries(AdaperType)}`
        );
    }
  }
}
