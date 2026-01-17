import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

const DUMMY_BCRYPT_HASH =
  '$2b$12$j3xTyaBXjfmAFyd.cVdRT.XaPPnO2zlOW/Fe4N/Lm0lsgbksmNI3O';

type SignInParams = Omit<SignUpParams, 'username'>;

interface SignUpParams {
  emailAddress: string;
  password: string;
  username: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn({
    emailAddress,
    password,
  }: SignInParams): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmailAddress(emailAddress);

    const hash = user?.passwordHash ?? DUMMY_BCRYPT_HASH;
    const isValid = await bcrypt.compare(password, hash);
    if (!user || !isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      emailAddress: user.emailAddress,
      sub: user.id,
      username: user.name,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp({ emailAddress, password, username }: SignUpParams) {
    const existingUser =
      await this.usersService.findByEmailAddress(emailAddress);
    if (existingUser) {
      throw new BadRequestException(`Email already used`);
    }

    const user = await this.usersService.create(
      username,
      emailAddress,
      password,
    );
    return {
      emailAddress: user.emailAddress,
      userId: user.id,
    };
  }
}
