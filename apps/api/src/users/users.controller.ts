import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from 'src/auth/decorator/user.decorator';
import { AuthenticatedUser } from 'src/auth/types/authenticated-user';

import { CurrentUserResponseDto } from './dto/get-current-user-response.dto';

@ApiBearerAuth()
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
