import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { CreateBookResponseDto } from '../dto/create-book-response.dto';

export function ApiCreateBook() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new book' }),
    ApiBadRequestResponse({ description: 'Invalid input' }),
    ApiResponse({ status: HttpStatus.CREATED, type: CreateBookResponseDto }),
    HttpCode(HttpStatus.CREATED),
  );
}
