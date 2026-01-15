import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

import { ChapterDto } from './chapter.dto';

export class BookDto {
  @ApiProperty({
    type: [ChapterDto],
  })
  @ArrayNotEmpty()
  @IsArray()
  @Type(() => ChapterDto)
  @ValidateNested({ each: true })
  chapters!: ChapterDto[];

  @ApiProperty({
    example: '6e426018-4251-4c2c-85db-23e8f9af19ae',
    type: String,
  })
  @IsString()
  id!: string;

  @ApiProperty({
    example:
      'The War of Art argues that creative success depends on recognizing and relentlessly overcoming “Resistance”—the internal force of fear, procrastination, and self-doubt that prevents meaningful work.',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  summary!: string;

  @ApiProperty({
    example: 'The War of Art',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title!: string;
}
