import { Injectable, NotFoundException } from '@nestjs/common';
import { BookDto } from './dto/book.dto';
import { mockLibrary } from './dto/mocks';
import { randomBytes, randomUUID, UUID } from 'crypto';
import { GetBookDto } from './dto/get-book.dto';
import { UploadBookDto } from './dto/upload-book.dto';

@Injectable()
export class BooksService {
  private library: BookDto[] = mockLibrary;

  listBooks(): GetBookDto[] {
    return this.library.map(({ chapters, ...rest }) => ({
      ...rest,
    }));
  }

  getBookById(id: UUID): GetBookDto {
    const book = this.library.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    const { chapters, ...bookWithoutChapters } = book;
    return bookWithoutChapters;
  }

  uploadBook(uploadBookDto: UploadBookDto): GetBookDto {
    const book = {
      ...uploadBookDto,
      id: randomUUID(),
    };
    this.library.push(book);
    const { chapters, ...bookWithoutChapters } = book;
    return bookWithoutChapters;
  }

  deleteBookById(id: UUID): void {
    const book = this.library.find((book) => book.id === id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    this.library = this.library.filter((book) => book.id !== id);
  }
}
