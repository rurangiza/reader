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
import { BookResponseDto } from './dto/book-response.dto';
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
  findAll(): BookResponseDto[] {
    return this.booksService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreateBook()
  create(@Body() body: CreateBookDto): BookResponseDto {
    return this.booksService.create(body);
  }

  @Get(':bookId')
  @HttpCode(HttpStatus.OK)
  @ApiFindOneBook()
  findOne(@Param() params: GetBookParamsDto): BookResponseDto {
    return this.booksService.findOne(params.bookId);
  }

  @Delete(':bookId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiRemoveBook()
  remove(@Param() params: RemoveBookParamsDto): void {
    return this.booksService.remove(params.bookId);
  }
}
