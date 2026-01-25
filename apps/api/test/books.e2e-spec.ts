import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from '@/app.module';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { DatabaseService } from '@/database/database.service';

import { getMockUser } from './mocks';

const AUTHENTICATED_USER_ID = "45aabdcb-0bb5-47cf-b628-24fa39cb4380";

const {guard: MockAuthGuard, user: MOCK_USER} = getMockUser(AUTHENTICATED_USER_ID)

const MOCK_BOOK = {
  chapters: [
    {
      content: "Hello",
      number: 1,
      title: "Uno"
    }
  ],
  title: "The information age"
}

describe('BooksModule (e2e)', () => {
  let app: INestApplication<App>;
  let database: DatabaseService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).overrideProvider(AuthGuard).useClass(MockAuthGuard).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({whitelist: true}))

    await app.init();

    database = app.get(DatabaseService);
  });

  beforeEach(async () => {
    await database.resetDatabase();
    await database.user.create({
      data: {
        emailAddress: MOCK_USER.emailAddress,
        id: AUTHENTICATED_USER_ID,
        name: MOCK_USER.name,
        passwordHash: "1234abcd",
      }
    })
  });

  afterAll(async () => {
    await app.close();
  })

  describe("create", () => {
    it("should create a book", () => {
      return request(app.getHttpServer())
        .post(`/books`)
        .send(MOCK_BOOK)
        .expect(HttpStatus.CREATED)
        .then((response) => {
          expect(response.body).toEqual(expect.objectContaining({
            id: expect.any(String) as unknown,
            title: MOCK_BOOK.title
          }));
        })
    })
  })

  describe("findChapter", () => {
    beforeEach(async () => {
      await database.book.create({
        data: {
          chapters: {
            create: MOCK_BOOK.chapters,
          },
          title: MOCK_BOOK.title,
          userId: MOCK_USER.id
        }
      })
    })
    it("should find the chapter", async () => {
      const book = await database.book.findFirst({
        where: {
          title: MOCK_BOOK.title
        }
      })
      return request(app.getHttpServer())
        .get(`/books/${book?.id}/chapters/1`)
        .expect(HttpStatus.OK)
        .then((response) => {
          expect(response.body).toEqual(expect.objectContaining({
            title: MOCK_BOOK.chapters[0]?.title
          }))
        })
    })

    it("should return 404 when chapter does not exist", async () => {
      const book = await database.book.findFirst({
        where: {
          title: MOCK_BOOK.title,
        }
      })
      return request(app.getHttpServer())
        .get(`/books/${book!.id}/chapters/${MOCK_BOOK.chapters.length + 1}`)
        .expect(HttpStatus.NOT_FOUND)
    })
  })
});
