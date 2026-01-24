import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ChapterResponseDto {
  @ApiProperty({
    description: "The content of the chapter",
    example: "Once upon a time, there was a yummy Tiramisu"
  })
  @IsNotEmpty()
  @IsString()
  content!: string;
  
  @ApiProperty({
    description: "The chapter number",
    example: 1,
  })
  @IsNumber()
  @Type(() => Number)
  number!: number;
  
  @ApiProperty({
    description: "The title of the chapter",
    example: "The joy of music"
  })
  @IsNotEmpty()
  @IsString()
  title!: string;
}