import { IsNotEmpty, IsString } from 'class-validator';

export class AuthorDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  bio!: string;
}
