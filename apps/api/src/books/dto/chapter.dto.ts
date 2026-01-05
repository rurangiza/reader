import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ChapterDto {
  @ApiProperty({
    type: Number,
    example: 6,
  })
  @IsNumber()
  number!: number;

  @ApiProperty({
    type: String,
    example: 'Resistance Is Universal',
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    type: String,
    example:
      'The chapter explains that Resistance affects everyone pursuing meaningful creative or personal work, regardless of talent, experience, or success, and that no one is exempt from struggling against it.',
  })
  @IsString()
  @IsNotEmpty()
  content!: string;
}
