import { ApiProperty, ApiSchema, OmitType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';

import { BookDto } from './book.dto';
import { ChapterDto } from './chapter.dto';

export class ReducedChapterDto extends PickType(ChapterDto, [
  'title',
  'number',
] as const) {}

@ApiSchema({
  description:
    'DTO representing a book entity returned in API responses, including all book details except the chapters array.',
})
export class GetBookResponseDto extends OmitType(BookDto, [
  'chapters',
] as const) {
  @ApiProperty({
    type: [ReducedChapterDto],
  })
  @ArrayNotEmpty()
  @IsArray()
  @Type(() => ReducedChapterDto)
  @ValidateNested({ each: true })
  chapters!: ReducedChapterDto[];
}
