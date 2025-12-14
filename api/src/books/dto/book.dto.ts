import type { UUID } from 'crypto';
import { ChapterDto } from './chapter.dto';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BookDto {
  @IsUUID()
  id!: UUID;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  summary!: string;

  @ValidateNested({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => ChapterDto)
  chapters!: ChapterDto[];
}
