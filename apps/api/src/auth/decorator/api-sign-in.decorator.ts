import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiSignIn() {
  return applyDecorators(
    ApiOperation({ summary: 'Log into the app' }),
    ApiResponse({
      status: HttpStatus.OK,
      headers: {
        'Set-Cookie': {
          description:
            'Authentication cookie. The server sets an HttpOnly cookie named AUTH_TOKEN on successful login.',
          schema: {
            type: 'string',
            example:
              'AUTH_TOKEN=abcde12345; Path=/; HttpOnly; SameSite=Lax; Secure=true',
          },
        },
      },
    }),
  );
}
