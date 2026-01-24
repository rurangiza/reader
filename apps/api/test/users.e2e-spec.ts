import { CanActivate, ExecutionContext, HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from '@/app.module';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { JwtClaims } from '@/auth/types/jwt';

const AUTHENTICATED_USER_ID = "45aabdcb-0bb5-47cf-b628-24fa39cb4380";

const MOCK_USER_CLAIMS: JwtClaims = {
  emailAddress: "john@gmail.com",
  exp: 123,
  iat: 123,
  sub: AUTHENTICATED_USER_ID,
  username: "johndoe"
}

const AUTHENTICATED_USER = {
  // user extracted from the JWT claims by the @User() decorator
  emailAddress: MOCK_USER_CLAIMS.emailAddress,
  id: MOCK_USER_CLAIMS.sub,
  name: MOCK_USER_CLAIMS.username
}

class MockAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    request['user'] = MOCK_USER_CLAIMS;
    return true;
  }
}

describe('UsersController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(AuthGuard).useClass(MockAuthGuard).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({whitelist: true}))

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  })

  describe("GET /users/me", () => {
    it("should return the current user when authenticated", () => {
      return request(app.getHttpServer())
        .get('/users/me')
        .expect(HttpStatus.OK)
        .expect(AUTHENTICATED_USER);
    });
  })
});
