import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import type { AuthenticatedUser } from './types/authenticated-user';

import { AuthService } from './auth.service';
import { ApiSignIn } from './decorator/api-sign-in.decorator';
import { ApiSignUp } from './decorator/api-sign-up.decorator';
import { Public } from './decorator/public.decorator';
import { User } from './decorator/user.decorator';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  profile(@User() user: AuthenticatedUser) {
    return user;
  }

  @ApiSignIn()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @Public()
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @ApiSignUp()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  @Public()
  signUp(@Body() signInDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(signInDto.username, signInDto.password);
  }
}
