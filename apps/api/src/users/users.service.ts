import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { DatabaseService } from '@/database/database.service';

const SALTORROUND = 12;
const MAX_PASS_LENGTH = 128;
const MIN_PASS_LENGTH = 12;

interface CreateUserParams {
  emailAddress: string,
  password: string,
  username: string,
}

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async create({emailAddress, password, username: name}: CreateUserParams) {
    if (!isStrongPassword(password)) {
      throw new BadRequestException('Invalid password');
    }

    const passwordHash = await bcrypt.hash(password, SALTORROUND);
    return this.database.user.create({
      data: {
        createdAt: new Date(),
        emailAddress,
        name,
        passwordHash,
      },
    });
  }

  async findByEmailAddress(emailAddress: string) {
    return await this.database.user.findFirst({
      where: {
        emailAddress,
      },
    });
  }

  async findById(id: string) {
    return this.database.user.findFirst({
      where: {
        id,
      },
    });
  }

  async findByName(name: string) {
    return await this.database.user.findFirst({
      where: {
        name,
      },
    });
  }
}

function isStrongPassword(pass: string) {
  return (pass && typeof pass === 'string' && pass.length <= MAX_PASS_LENGTH && pass.length >= MIN_PASS_LENGTH)
}