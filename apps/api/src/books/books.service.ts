import { Injectable, NotFoundException } from '@nestjs/common';
import { UUID } from 'crypto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class BooksService {
  constructor(private readonly database: DatabaseService) {}

  async create(
    book: {
      chapters: { content: string; number: number; title: string }[];
      title: string;
    },
    userId: string,
  ) {
    return await this.database.$transaction(async (tx) => {
      const chapters = await tx.chapter.createManyAndReturn({
        data: book.chapters,
      });
      return await tx.book.create({
        data: {
          chapters: {
            connect: chapters,
          },
          title: book.title,
          userId,
        },
        select: {
          id: true,
          title: true,
        },
      });
    });
  }

  async findAll({ userId }: { userId: string }) {
    return await this.database.book.findMany({
      orderBy: { createdAt: 'desc' },
      where: {
        userId,
      },
    });
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
