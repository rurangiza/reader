import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiSignIn() {
  return applyDecorators(
    ApiOperation({ summary: 'Log into the app' }),
    ApiResponse({
      headers: {
        'Set-Cookie': {
          description:
            'Authentication cookie. The server sets an HttpOnly cookie named AUTH_TOKEN on successful login.',
          schema: {
            example:
              'AUTH_TOKEN=abcde12345; Path=/; HttpOnly; SameSite=Lax; Secure=true',
            type: 'string',
          },
        },
      },
      status: HttpStatus.OK,
    }),
  );
}
