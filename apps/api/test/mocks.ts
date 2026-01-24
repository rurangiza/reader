import { CanActivate, ExecutionContext, Type } from "@nestjs/common";

import { JwtClaims } from "@/auth/types/jwt";

interface MockUser {
  claims: {
    emailAddress: string,
    exp: number,
    iat: number,
    sub: string,
    username: string
  },
  guard: Type<CanActivate>
  user: {
    emailAddress: string,
    id: string,
    name: string,
  },
}

export function getMockUser(
  id: string,
  emailAddress = "john@gmail.com",
  name = "johndoe"
): MockUser {

  const claims = {
    emailAddress,
    exp: 123,
    iat: 123,
    sub: id,
    username: name
  }

  return {
    claims,
    guard: getGuard(claims),
    user: {
      emailAddress,
      id,
      name
    }
  }
}

function getGuard(userClaims: JwtClaims) {
  class MockAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest<Request>();
      request['user'] = userClaims;
      return true;
    }
  }

  return MockAuthGuard;
}