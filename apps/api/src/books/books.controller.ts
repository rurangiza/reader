import type { AuthenticatedUser } from 'src/auth/types/authenticated-user';

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
import { User } from 'src/auth/decorator/user.decorator';

import { BooksService } from './books.service';
import { ApiCreateBook } from './decorators/api-create-book.decorator';
import { ApiFindAllBooks } from './decorators/api-find-all-books.decorator';
import { ApiFindOneBook } from './decorators/api-find-one-book.decorator';
import { ApiRemoveBook } from './decorators/api-remove-book.decorator';
import { BookResponseDto } from './dto/book-response.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBookParamsDto } from './dto/get-book-params.dto';
import { RemoveBookParamsDto } from './dto/remove-book-params.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiCreateBook()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @Body() body: CreateBookDto,
    @User() user: AuthenticatedUser,
  ): Promise<BookResponseDto> {
    return this.booksService.create(body, user.id);
  }

  @ApiFindAllBooks()
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<BookResponseDto[]> {
    return this.booksService.findAll();
  }

  @ApiFindOneBook()
  @Get(':bookId')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param() params: GetBookParamsDto): Promise<BookResponseDto> {
    return this.booksService.findOne(params.bookId);
  }

  @ApiRemoveBook()
  @Delete(':bookId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param() params: RemoveBookParamsDto): Promise<void> {
    return this.booksService.remove(params.bookId);
  }
}
