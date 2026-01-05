import { Injectable, NotFoundException } from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { mockLibrary } from './dto/mocks';
import { randomUUID, UUID } from 'crypto';
import { GetBookDto } from './dto/get-book.dto';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  private library: BookDto[] = mockLibrary;

  findAll(): GetBookDto[] {
    return this.library.map(({ chapters: _chapters, ...rest }) => ({
      ...rest,
    }));
  }

  findOne(id: UUID): GetBookDto {
    const book = this.library.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const { chapters: _chapters, ...bookWithoutChapters } = book;
    return bookWithoutChapters;
  }

  create(uploadBookDto: CreateBookDto): GetBookDto {
    const book = {
      ...uploadBookDto,
      id: randomUUID(),
    };
    this.library.push(book);
    const { chapters: _chapters, ...bookWithoutChapters } = book;
    return bookWithoutChapters;
  }

  remove(id: UUID): void {
    const book = this.library.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    this.library = this.library.filter((book) => book.id !== id);
  }
}
