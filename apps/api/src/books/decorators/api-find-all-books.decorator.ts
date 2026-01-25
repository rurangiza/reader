import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { GetBookResponseDto } from '../dto/get-book-response.dto';

export function ApiFindAllBooks() {
  return applyDecorators(
    ApiOperation({ summary: 'List all the books' }),
    ApiResponse({ status: HttpStatus.OK, type: [GetBookResponseDto] }),
    HttpCode(HttpStatus.OK),
  );
}
