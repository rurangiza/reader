import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiLogout() {
  return applyDecorators(
    ApiOperation({ summary: 'Logs out an authenticated user' }),
    ApiResponse({ status: HttpStatus.OK }),
  );
}
