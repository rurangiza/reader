import type { AuthenticatedUser } from 'src/auth/types/authenticated-user';

import { Controller, Get } from '@nestjs/common';
import { ApiCookieAuth } from '@nestjs/swagger';
import { User } from 'src/auth/decorator/user.decorator';

import { ApiGetCurrentUser } from './decorators/api-get-current-user.decorator';
import { CurrentUserResponseDto } from './dto/get-current-user-response.dto';

@ApiCookieAuth('AUTH_TOKEN')
@Controller('users')
export class UsersController {
  @ApiGetCurrentUser()
  @Get('me')
  getCurrentUser(@User() user: AuthenticatedUser): CurrentUserResponseDto {
    return user;
  }
}
