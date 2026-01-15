import { IsNotEmpty, IsString } from 'class-validator';

export class SignUpResponseDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  username: string;
}
