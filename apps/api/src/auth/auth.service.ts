import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';

const DUMMY_BCRYPT_HASH =
  '$2b$12$j3xTyaBXjfmAFyd.cVdRT.XaPPnO2zlOW/Fe4N/Lm0lsgbksmNI3O';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<SignInResponseDto> {
    const user = await this.usersService.findByName(username);

    const hash = user?.password ?? DUMMY_BCRYPT_HASH;
    const isValid = await bcrypt.compare(pass, hash);
    if (!user || !isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, password: string): Promise<SignUpResponseDto> {
    const user = await this.usersService.create(username, password);
    return {
      userId: user.id,
      username: user.username,
    };
  }
}
