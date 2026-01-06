import { IsNotEmpty, IsString } from 'class-validator';

export class AuthorDto {
  @IsNotEmpty()
  @IsString()
  bio!: string;

  @IsNotEmpty()
  @IsString()
  name!: string;
}
