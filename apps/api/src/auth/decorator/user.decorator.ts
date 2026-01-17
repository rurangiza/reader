import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedRequest } from '../types/authenticated-request';
import { AuthenticatedUser } from '../types/authenticated-user';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    if (!request?.user) {
      throw new Error('Missing user info');
    }
    return {
      id: request.user.sub,
      name: request.user.username,
      emailAddress: request.user.emailAddress,
    };
  },
);
