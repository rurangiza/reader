import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { ChapterResponseDto } from '../dto/chapter-response.dto';


export function ApiFindChapter() {
  return applyDecorators(
    ApiOperation({ summary: 'Get a chapter from a book' }),
    ApiNotFoundResponse({ description: 'No chapter found for this book' }),
    ApiResponse({ status: HttpStatus.OK, type: ChapterResponseDto }),
    HttpCode(HttpStatus.OK)
  );
}
