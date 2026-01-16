import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { ApiSignIn } from './decorator/api-sign-in.decorator';
import { ApiSignUp } from './decorator/api-sign-up.decorator';
import { Public } from './decorator/public.decorator';
import { SignInResponseDto } from './dto/sign-in-response.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiSignIn()
  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  @Public()
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto.emailAddress, signInDto.password);
  }

  @ApiSignUp()
  @HttpCode(HttpStatus.OK)
  @Post('sign-up')
  @Public()
  signUp(@Body() signInDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(
      signInDto.username,
      signInDto.emailAddress,
      signInDto.password,
    );
  }
}
