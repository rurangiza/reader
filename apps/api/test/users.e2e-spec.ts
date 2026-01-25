import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from '@/app.module';
import { AuthGuard } from '@/auth/guards/auth.guard';

import { getMockUser } from './mocks';

const AUTHENTICATED_USER_ID = "45aabdcb-0bb5-47cf-b628-24fa39cb4380";

const {guard: MockAuthGuard, user: AUTHENTICATED_USER} = getMockUser(AUTHENTICATED_USER_ID)

describe('UsersModule (e2e)', () => {
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
