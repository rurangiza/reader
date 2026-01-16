import { createParamDecorator, ExecutionContext } from '@nestjs/common';

class AuthenticatedRequest extends Request {
  user: {
    exp: number;
    iat: number;
    sub: string;
    username: string;
  };
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    if (!request?.user) {
      throw new Error('Missing user info');
    }
    return {
      id: request.user.sub,
      name: request.user.username,
    };
  },
);
