import { Test, TestingModule } from '@nestjs/testing';

import { AuthenticatedUser } from '@/auth/types/authenticated-user';

import { UsersController } from './users.controller';

describe('UsersController', () => {
  let usersController: UsersController;

  const MOCK_AUTHENTICATED_USER: AuthenticatedUser = {
    emailAddress: "johndoe@gmail.com",
    id: "42",
    name: "john"
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  describe("getCurrentUser", () => {
    it("should return the authenticated user", () => {
      expect(usersController.getCurrentUser(MOCK_AUTHENTICATED_USER))
        .toBe(MOCK_AUTHENTICATED_USER);
    })
  })
});
