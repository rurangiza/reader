import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';

const SALTORROUND = 12;

@Injectable()
export class UsersService {
  constructor(private readonly database: DatabaseService) {}

  async create(username: string, password: string) {
    if (
      !password ||
      typeof password !== 'string' ||
      password.length > 128 ||
      password.length < 12
    ) {
      throw new BadRequestException('Invalid password');
    }

    const hash = await bcrypt.hash(password, SALTORROUND);
    return this.database.user.create({
      data: {
        password: hash,
        username,
      },
    });
  }

  async findByName(username: string) {
    return await this.database.user.findFirst({
      where: {
        username,
      },
    });
  }

  async findOne(id: string) {
    return this.database.user.findFirst({
      where: {
        id,
      },
    });
  }
}
