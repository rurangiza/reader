import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@ApiSchema({
  description: 'Response receive after creating an account',
})
export class SignUpResponseDto {
  @ApiProperty({
    example: 'jdoe@gmail.com',
    type: String,
  })
  @IsEmail()
  @IsNotEmpty()
  emailAddress!: string;

  @ApiProperty({
    example: '6e426018-4251-4c2c-85db-23e8f9af19ae',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  userId: string;
}
