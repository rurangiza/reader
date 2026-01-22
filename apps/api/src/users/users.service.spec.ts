import { BadRequestException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { randomUUID } from "crypto";

import { DatabaseService } from "@/database/database.service";

import { MAX_PASS_LENGTH, MIN_PASS_LENGTH, UsersService } from "./users.service"

interface FindUserParams {
  where: {
    emailAddress: string,
    id: string,
    name: string
  }
}

describe("UsersService", () => {
  let usersService: UsersService;

  const MOCK_USER = {
    emailAddress: "johndoe@gmail.com",
    id: "42",
    password: "x".repeat(MIN_PASS_LENGTH+1),
    username: "johndoe",
  }

  const MOCK_USERS = [MOCK_USER]

  const mockDatabase = {
    user: {
      create: jest.fn().mockResolvedValue({
        emailAddress: MOCK_USER.emailAddress,
        id: randomUUID(),
        username: MOCK_USER.username
      }),
      findFirst: jest.fn().mockImplementation(
        (args: FindUserParams) => {
          const {emailAddress, id} = args.where;
          if (emailAddress)
            return MOCK_USERS.find((user) => user.emailAddress === emailAddress)
          if (id)
            return MOCK_USERS.find((user) => user.id === id)
          return undefined;
        },
      )
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {provide: DatabaseService, useValue: mockDatabase}],
    }).compile()

    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  })

  describe("create", () => {
    it(`should throw when password is too short`, async () => {
      await expect(usersService.create({
        emailAddress: MOCK_USER.emailAddress,
        password: "x".repeat(MIN_PASS_LENGTH - 1),
        username: MOCK_USER.username
      })).rejects.toThrow(BadRequestException)
      expect(mockDatabase.user.create).not.toHaveBeenCalled()
    })

    it(`should throw when password is too long`, async () => {
      await expect(usersService.create({
        emailAddress: MOCK_USER.emailAddress,
        password: "x".repeat(MAX_PASS_LENGTH + 1),
        username: MOCK_USER.username
      })).rejects.toThrow(BadRequestException)
      expect(mockDatabase.user.create).not.toHaveBeenCalled()
    })
    
    it("should throw when password is missing", async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await expect(usersService.create({
        emailAddress: MOCK_USER.emailAddress,
        password: undefined,
        username: MOCK_USER.username
      } as any)).rejects.toThrow(BadRequestException)
      expect(mockDatabase.user.create).not.toHaveBeenCalled()
    })

    it("should throw when password is not a string", async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      await expect(usersService.create({
        emailAddress: MOCK_USER.emailAddress,
        password: 42,
        username: MOCK_USER.username
      } as any)).rejects.toThrow(BadRequestException)
      expect(mockDatabase.user.create).not.toHaveBeenCalled()
    })
    
    it("should create the user when the password is valid", async () => {
      // spying on UsersService.hashPassowrd instead of bcrypt.hash
      // because project compiles as NodeNext/ESM
      // so bcrypt's exports are read only -> cannot be redefined by jest
      const hashPasswordSpy = jest.spyOn(UsersService as any, 'hashPassword').mockResolvedValue('hashed-password');

      const user = await usersService.create(MOCK_USER);
      
      expect(user).toEqual(expect.objectContaining({
        emailAddress: MOCK_USER.emailAddress,
      }));
      expect(hashPasswordSpy).toHaveBeenCalledTimes(1);
      expect(mockDatabase.user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            passwordHash: "hashed-password"
          }) as unknown
        })
      )
    })

    it("should create the user when the password's length matches the minimum", async () => {
      const {emailAddress, password: _pass, username} = MOCK_USER;

      await expect(usersService.create({
        emailAddress,
        password: "x".repeat(MIN_PASS_LENGTH),
        username
      })).resolves.toBeDefined();
      expect(mockDatabase.user.create).toHaveBeenCalledTimes(1);
    })

    it("should create the user when the password's length matches the maximum", async () => {
      const {emailAddress, password: _pass, username} = MOCK_USER;

      await expect(usersService.create({
        emailAddress,
        password: "x".repeat(MAX_PASS_LENGTH),
        username
      })).resolves.toBeDefined();
      expect(mockDatabase.user.create).toHaveBeenCalledTimes(1);
    })
  })

  describe("findByEmailAddress", () => {
    it("should return a user when a matching email exists", async () => {
      const user = await usersService.findByEmailAddress(MOCK_USER.emailAddress);

      expect(user).toEqual(expect.objectContaining({
        emailAddress: MOCK_USER.emailAddress,
      }))
      expect(mockDatabase.user.findFirst).toHaveBeenCalledWith(expect.objectContaining({
        where: {
          emailAddress: MOCK_USER.emailAddress
        }
      }))
    })

    it("should return undefined when no user has a matching email", async () => {
      const invalidEmail = "doesnotexist@gmail.com"
      const user = await usersService.findByEmailAddress(invalidEmail);
      expect(user).toBeUndefined();
      expect(mockDatabase.user.findFirst).toHaveBeenCalledWith(expect.objectContaining({
        where: {
          emailAddress: invalidEmail,
        }
      }))
    })
  })

  describe("findById", () => {
    it("should return a user when a matching ID exist", async () => {
      const user = await usersService.findById(MOCK_USER.id);
      expect(user).toBe(MOCK_USER)
      expect(mockDatabase.user.findFirst).toHaveBeenCalledWith(expect.objectContaining({
        where: {
          id: MOCK_USER.id
        }
      }))
    })
  })
})