import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'crypto';
import { DatabaseService } from 'src/database/database.service';

import { BookResponseDto } from './dto/book-response.dto';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly database: DatabaseService) {}

  async create(uploadBookDto: CreateBookDto) {
    try {
      return await this.database.book.create({
        data: {
          summary: uploadBookDto.summary,
          title: uploadBookDto.title,
        },
        select: {
          id: true,
          summary: true,
          title: true,
        },
      });
    } catch (dbError) {
      console.error(dbError);
      throw dbError;
    }
  }

  async findAll(): Promise<BookResponseDto[]> {
    try {
      return await this.database.book.findMany();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findOne(id: UUID): Promise<BookResponseDto> {
    try {
      const book = await this.database.book.findFirst({
        where: {
          id,
        },
      });
      if (!book) {
        throw new NotFoundException('Book not found');
      }
      return book;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async remove(id: UUID): Promise<void> {
    try {
      const book = await this.database.book.delete({
        where: {
          id,
        },
      });
      if (!book) {
        throw new NotFoundException('Book not found');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
