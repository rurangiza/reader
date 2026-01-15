import { IsNotEmpty, IsString } from 'class-validator';

export class SignInResponseDto {
  @IsNotEmpty()
  @IsString()
  access_token: string;
}
