import type { Response } from 'express';

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { ApiLogout } from './decorator/api-logout.decorator';
import { ApiSignIn } from './decorator/api-sign-in.decorator';
import { ApiSignUp } from './decorator/api-sign-up.decorator';
import { Public } from './decorator/public.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @ApiLogout()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response): void {
    response.clearCookie('AUTH_TOKEN', {
      path: '/',
    });
  }

  @ApiSignIn()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @Public()
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const { access_token } = await this.authService.signIn({ ...signInDto });
    response.cookie('AUTH_TOKEN', access_token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: this.configService.get('NODE_ENV') === 'production',
    });
  }

  @ApiSignUp()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @Public()
  async signUp(@Body() signInDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp({ ...signInDto });
  }
}
