import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { IS_PUBLIC_KEY } from '../decorator/public.decorator';
import { AuthenticatedRequest } from '../types/authenticated-request';
import { JwtClaims } from '../types/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const cookies = request.cookies;
    if (!cookies || typeof cookies !== 'object') {
      throw new UnauthorizedException('Invalid credentials');
    }
    const authToken = (cookies as Record<string, unknown>).AUTH_TOKEN;
    if (typeof authToken !== 'string' || !authToken.length) {
      throw new UnauthorizedException('Invalid credentials');
    }

    try {
      const payload: JwtClaims = await this.jwtService.verifyAsync(authToken);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
