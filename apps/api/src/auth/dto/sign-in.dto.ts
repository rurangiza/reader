import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, IsString, Length } from 'class-validator';

@ApiSchema({
  description: 'Login credentials',
})
export class SignInDto {
  @ApiProperty({
    example: '9JrHmsFZK8J-a',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  password!: string;

  @ApiProperty({
    description: 'Unique username',
    example: 'john-doe',
    type: String,
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  @IsString()
  @Length(3, 32)
  username!: string;
}
