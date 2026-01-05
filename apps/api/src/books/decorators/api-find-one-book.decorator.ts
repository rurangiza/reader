import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BookDto } from '../dto/book.dto';

export function ApiFindOneBook() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a book by its ID' }),
    ApiNotFoundResponse({description: "Book not found"}),
    ApiResponse({ status: HttpStatus.OK, type: BookDto }),
  );
}
