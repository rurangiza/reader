import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'crypto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BooksService {
  constructor(private readonly database: DatabaseService) {}

  async create(
    book: { chapters: object[]; summary: string; title: string },
    userId: string,
  ) {
    // TODO: save the chapters
    return await this.database.book.create({
      data: {
        // TODO: generate the summary
        summary: book.summary,
        title: book.title,
        userId,
      },
      select: {
        id: true,
        summary: true,
        title: true,
      },
    });
  }

  async findAll() {
    return await this.database.book.findMany();
  }

  async findOne(id: UUID) {
    const book = await this.database.book.findFirst({
      where: {
        id,
      },
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async remove(id: UUID) {
    const book = await this.database.book.delete({
      where: {
        id,
      },
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
  }
}
