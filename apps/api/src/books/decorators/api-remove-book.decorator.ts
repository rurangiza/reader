import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

export function ApiRemoveBook() {
  return applyDecorators(
    ApiOperation({ summary: 'Delete a book by its ID' }),
    ApiNotFoundResponse({ description: 'Book not found' }),
    ApiResponse({ status: HttpStatus.NO_CONTENT }),
  );
}
