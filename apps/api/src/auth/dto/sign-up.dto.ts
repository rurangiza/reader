import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
} from 'class-validator';

@ApiSchema({
  description: 'Sign-up credentials',
})
export class SignUpDto {
  @ApiProperty({
    example: '9JrHmsFZK8J-a',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @Length(12, 64)
  password!: string;

  @ApiProperty({
    example: 'john-doe',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 32)
  @Matches(/^[a-zA-Z0-9-]+$/)
  username!: string;
}
