import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiSignIn() {
  return applyDecorators(
    ApiOperation({ summary: 'Log into the app' }),
    ApiResponse({ status: HttpStatus.OK }),
  );
}
