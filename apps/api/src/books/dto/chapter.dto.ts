import { ApiProperty, ApiSchema } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@ApiSchema({
  description: 'DTO for a single book chapter.',
})
export class ChapterDto {
  @ApiProperty({
    example:
      'The chapter explains that Resistance affects everyone pursuing meaningful creative or personal work, regardless of talent, experience, or success, and that no one is exempt from struggling against it.',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  content!: string;

  @ApiProperty({
    example: 6,
    type: Number,
  })
  @IsNumber()
  number!: number;

  @ApiProperty({
    example: 'Resistance Is Universal',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  title!: string;
}
