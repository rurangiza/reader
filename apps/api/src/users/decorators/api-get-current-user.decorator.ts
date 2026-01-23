import { applyDecorators, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

import { CurrentUserResponseDto } from '../dto/get-current-user-response.dto';

export function ApiGetCurrentUser() {
  return applyDecorators(
    ApiOperation({ summary: "Get informations about the logged in user" }),
    ApiBadRequestResponse({ description: 'Invalid input' }),
    ApiResponse({ status: HttpStatus.OK, type: CurrentUserResponseDto }),
    HttpCode(HttpStatus.OK),
  );
}
