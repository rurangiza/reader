import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController],
  imports: [DatabaseModule],
  providers: [BooksService],
})
export class BooksModule {}
