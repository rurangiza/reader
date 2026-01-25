import type { AuthenticatedUser } from 'src/auth/types/authenticated-user';

import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { User } from 'src/auth/decorator/user.decorator';

import { BooksService } from './books.service';
import { ApiCreateBook } from './decorators/api-create-book.decorator';
import { ApiFindAllBooks } from './decorators/api-find-all-books.decorator';
import { ApiFindChapter } from './decorators/api-find-chapter.decorator';
import { ApiFindOneBook } from './decorators/api-find-one-book.decorator';
import { ApiRemoveBook } from './decorators/api-remove-book.decorator';
import { ChapterResponseDto } from './dto/chapter-response.dto';
import { CreateBookResponseDto } from './dto/create-book-response.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBookParamsDto } from './dto/get-book-params.dto';
import { GetBookResponseDto } from './dto/get-book-response.dto';
import { GetChapterParamsDto } from './dto/get-chapter-params.dto';
import { RemoveBookParamsDto } from './dto/remove-book-params.dto';

@ApiCookieAuth('AUTH_TOKEN')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiCreateBook()
  @Post()
  async create(
    @Body() body: CreateBookDto,
    @User() user: AuthenticatedUser,
  ): Promise<CreateBookResponseDto> {
    return this.booksService.create(body, user.id);
  }

  @ApiFindAllBooks()
  @Get()
  async findAllForUser(
    @User() user: AuthenticatedUser,
  ): Promise<GetBookResponseDto[]> {
    return this.booksService.findAllForUser({ userId: user.id });
  }

  @ApiFindChapter()
  @Get(':id/chapters/:number')
  async findChapter(
    @Param() params: GetChapterParamsDto,
  ): Promise<ChapterResponseDto> {
    return this.booksService.findChapter(params.id, params.number);
  }

  @ApiFindOneBook()
  @Get(':id')
  async findOne(
    @Param() params: GetBookParamsDto,
  ): Promise<GetBookResponseDto> {
    return this.booksService.findOne(params.id);
  }

  @ApiRemoveBook()
  @Delete(':id')
  async remove(@Param() params: RemoveBookParamsDto): Promise<void> {
    return this.booksService.remove(params.id);
  }
}
