import type { Response } from 'express';

import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { ApiSignIn } from './decorator/api-sign-in.decorator';
import { ApiSignUp } from './decorator/api-sign-up.decorator';
import { Public } from './decorator/public.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiSignIn()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  @Public()
  async signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    const result = await this.authService.signIn(
      signInDto.emailAddress,
      signInDto.password,
    );
    response.cookie('token', result.access_token, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      // secure: true, TODO: add this
    });
  }

  @ApiSignUp()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  @Public()
  signUp(@Body() signInDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(
      signInDto.username,
      signInDto.emailAddress,
      signInDto.password,
    );
  }
}
