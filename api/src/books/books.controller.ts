import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { BooksService } from './books.service';
import type { GetBookDto } from './dto/get-book.dto';
import type { UUID } from 'crypto';
import { UploadBookDto } from './dto/upload-book.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookDto } from './dto/book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of all books' })
  @ApiResponse({ status: HttpStatus.OK, type: [BookDto] })
  @HttpCode(HttpStatus.OK)
  listBooks(): GetBookDto[] {
    return this.booksService.listBooks();
  }

  @Post()
  @ApiOperation({ summary: 'Upload a new book' })
  @ApiResponse({ status: HttpStatus.CREATED, type: BookDto })
  @HttpCode(HttpStatus.CREATED)
  uploadBook(@Body() uploadBookDto: UploadBookDto) {
    return this.booksService.uploadBook(uploadBookDto);
  }

  @Get(':bookId')
  @ApiOperation({ summary: 'Get a book by its ID' })
  @ApiResponse({ status: HttpStatus.OK, type: BookDto })
  @HttpCode(HttpStatus.OK)
  getBookById(@Param('bookId') bookId: UUID): GetBookDto {
    return this.booksService.getBookById(bookId);
  }

  @Delete(':bookId')
  @ApiOperation({ summary: 'Delete a book by its ID' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteBookById(@Param('bookId') bookId: UUID): void {
    return this.booksService.deleteBookById(bookId);
  }
}
