import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { BookResponseDto } from '../dto/book-response.dto';

export function ApiFindAllBooks() {
  return applyDecorators(
    ApiOperation({ summary: 'List all the books' }),
    ApiResponse({ status: HttpStatus.OK, type: [BookResponseDto] }),
  );
}
