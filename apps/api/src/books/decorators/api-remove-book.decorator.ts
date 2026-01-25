import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export function ApiRemoveBook() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a book by its ID' }),
    ApiNotFoundResponse({ description: 'Book not found' }),
    ApiResponse({ description: 'Book deleted', status: HttpStatus.NO_CONTENT }),
    HttpCode(HttpStatus.NO_CONTENT)
  );
}
