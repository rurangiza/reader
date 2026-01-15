import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 12,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password!: string;

  @IsNotEmpty()
  @IsString()
  username!: string;
}
