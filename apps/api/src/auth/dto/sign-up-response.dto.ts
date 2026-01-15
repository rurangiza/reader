import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@ApiSchema({
  description: 'Response receive after creating an account',
})
export class SignUpResponseDto {
  @ApiProperty({
    example: '6e426018-4251-4c2c-85db-23e8f9af19ae',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    example: 'john-doe',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  username: string;
}
