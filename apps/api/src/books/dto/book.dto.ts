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
import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty({
    type: String,
    example: '6e426018-4251-4c2c-85db-23e8f9af19ae',
  })
  @IsUUID()
  id!: UUID;

  @ApiProperty({
    type: String,
    example: 'The War of Art',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    type: String,
    example:
      'The War of Art argues that creative success depends on recognizing and relentlessly overcoming “Resistance”—the internal force of fear, procrastination, and self-doubt that prevents meaningful work.',
  })
  @IsString()
  @IsNotEmpty()
  summary!: string;

  @ApiProperty({
    type: [ChapterDto],
  })
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @Type(() => ChapterDto)
  chapters!: ChapterDto[];
}
