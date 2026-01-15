import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { SignUpResponseDto } from '../dto/sign-up-response.dto';

export function ApiSignUp() {
  return applyDecorators(
    ApiOperation({ summary: 'Create an account' }),
    ApiResponse({ status: HttpStatus.OK, type: SignUpResponseDto }),
  );
}
