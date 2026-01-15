import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { BooksModule } from './books/books.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    BooksModule,
    DatabaseModule,
  ],
})
export class AppModule {}
