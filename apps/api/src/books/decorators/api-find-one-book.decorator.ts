import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { GetBookResponseDto } from '../dto/get-book-response.dto';

export function ApiFindOneBook() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a book by its ID' }),
    ApiNotFoundResponse({ description: 'Book not found' }),
    ApiResponse({ status: HttpStatus.OK, type: GetBookResponseDto }),
    HttpCode(HttpStatus.OK),
  );
}
