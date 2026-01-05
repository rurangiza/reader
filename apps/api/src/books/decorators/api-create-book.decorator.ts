import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { GetBookDto } from '../dto/get-book.dto';
import { CreateBookDto } from '../dto/create-book.dto';

export function ApiCreateBook() {
  return applyDecorators(
    ApiOperation({ summary: 'Create a new book' }),
    ApiBadRequestResponse({ description: 'Invalid input' }),
    ApiResponse({ status: HttpStatus.CREATED, type: GetBookDto }),
    ApiBody({
      type: CreateBookDto,
    }),
  );
}
