import { Injectable, NotFoundException } from '@nestjs/common';
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
      const bookCreated = await tx.book.create({
        data: {
          title: book.title,
          userId,
        },
        select: {
          id: true,
          title: true,
        },
      });
      await tx.chapter.createManyAndReturn({
        data: book.chapters.map((chapter) => ({
          ...chapter,
          bookId: bookCreated.id,
        })),
      });
      return bookCreated;
    });
  }

  async findAllForUser({ userId }: { userId: string }) {
    return await this.database.book.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        chapters: {
          select: {
            number: true,
            title: true,
          },
        },
        id: true,
        title: true,
      },
      where: {
        userId,
      },
    });
  }

  async findChapter(bookId: string, chapterNumber: number) {
    try {
      return await this.database.chapter.findFirstOrThrow({
        select: {
          content: true,
          number: true,
          title: true,
        },
        where: {
          bookId,
          number: chapterNumber,
        },
      });
    } catch {
      throw new NotFoundException(
        `Chapter ${chapterNumber} not found in book ${bookId}`,
      );
    }
  }

  async findOne(id: string) {
    const book = await this.database.book.findFirst({
      select: {
        chapters: {
          select: {
            number: true,
            title: true,
          },
        },
        id: true,
        title: true,
      },
      where: {
        id,
      },
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async remove(id: string) {
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
