import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID, UUID } from 'crypto';

import { BookResponseDto } from './dto/book-response.dto';
import { BookDto } from './dto/book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { mockLibrary } from './dto/mocks';

@Injectable()
export class BooksService {
  private library: BookDto[] = mockLibrary;

  create(uploadBookDto: CreateBookDto): BookResponseDto {
    const book = {
      ...uploadBookDto,
      id: randomUUID(),
    };
    this.library.push(book);
    const { chapters: _chapters, ...bookWithoutChapters } = book;
    return bookWithoutChapters;
  }

  findAll(): BookResponseDto[] {
    return this.library.map(({ chapters: _chapters, ...rest }) => ({
      ...rest,
    }));
  }

  findOne(id: UUID): BookResponseDto {
    const book = this.library.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
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
