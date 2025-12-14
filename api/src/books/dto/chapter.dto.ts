import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ChapterDto {
  @IsNumber()
  number!: number;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
}
