import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { BookResponseDto } from '../dto/book-response.dto';
import { CreateBookDto } from '../dto/create-book.dto';

export function ApiCreateBook() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new book' }),
    ApiBadRequestResponse({ description: 'Invalid input' }),
    ApiResponse({ status: HttpStatus.CREATED, type: BookResponseDto }),
    ApiBody({
      type: CreateBookDto,
    }),
  );
}
