import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  Post,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { GetBookDto } from './dto/get-book.dto';
import type { UUID } from 'crypto';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiFindAllBooks } from './decorators/api-find-all-books.decorator';
import { ApiCreateBook } from './decorators/api-create-book.decorator';
import { ApiFindOneBook } from './decorators/api-find-one-book.decorator';
import { ApiRemoveBook } from './decorators/api-remove-book.decorator';
import { GetBookParamsDto } from './dto/get-book-params.dto';
import { RemoveBookParamsDto } from './dto/remove-book-params.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiFindAllBooks()
  findAll(): GetBookDto[] {
    return this.booksService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateBook()
  create(@Body() body: CreateBookDto): GetBookDto {
    return this.booksService.create(body);
  }

  @Get(':bookId')
  @HttpCode(HttpStatus.OK)
  @ApiFindOneBook()
  findOne(@Param() params: GetBookParamsDto): GetBookDto {
    return this.booksService.findOne(params.bookId);
  }

  @Delete(':bookId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiRemoveBook()
  remove(@Param() params: RemoveBookParamsDto): void {
    return this.booksService.remove(params.bookId);
  }
}
