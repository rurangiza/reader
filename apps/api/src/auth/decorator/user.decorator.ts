import { createParamDecorator, ExecutionContext } from '@nestjs/common';

class RequestWithUserInfo extends Request {
  user: {
    exp: number;
    iat: number;
    sub: string;
    username: string;
  };
}

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUserInfo>();
    if (!request?.user) {
      throw new Error('Missing user info');
    }
    return {
      sub: request.user.sub,
    };
  },
);
