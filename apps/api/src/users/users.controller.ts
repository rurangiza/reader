import type { AuthenticatedUser } from 'src/auth/types/authenticated-user';

import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiCookieAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/auth/decorator/user.decorator';

import { CurrentUserResponseDto } from './dto/get-current-user-response.dto';

@ApiCookieAuth('AUTH_TOKEN')
@Controller('users')
export class UsersController {
  @ApiOperation({ description: 'Get informations about the logged in user' })
  @ApiResponse({ status: HttpStatus.CREATED, type: CurrentUserResponseDto })
  @Get('me')
  @HttpCode(HttpStatus.OK)
  getCurrentUser(@User() user: AuthenticatedUser): CurrentUserResponseDto {
    return user;
  }
}
