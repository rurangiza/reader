import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CurrentUserResponseDto {
  @ApiProperty({
    description: 'ID of the user',
    example: '2691fc73-e784-4e4c-a266-231f5992bfce',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id!: string;
}
