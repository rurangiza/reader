import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookDto } from '../dto/book.dto';
import { GetBookDto } from '../dto/get-book.dto';

export function ApiFindAllBooks() {
  return applyDecorators(
    ApiOperation({ summary: 'List all the books' }),
    ApiResponse({ status: HttpStatus.OK, type: [GetBookDto]}),
  );
}
