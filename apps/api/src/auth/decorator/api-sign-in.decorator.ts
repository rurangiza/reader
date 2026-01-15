import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { SignInResponseDto } from '../dto/sign-in-response.dto';

export function ApiSignIn() {
  return applyDecorators(
    ApiOperation({ summary: 'Log into the app' }),
    ApiResponse({ status: HttpStatus.OK, type: SignInResponseDto }),
  );
}
