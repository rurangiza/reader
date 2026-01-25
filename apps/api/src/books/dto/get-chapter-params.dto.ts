import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class GetChapterParamsDto {
  @ApiProperty({
    description: "ID of the book",
    example: "78c01f73-8c20-495b-90d0-6e91f4353dd1",
    type: String
  })
  @IsNotEmpty()
  @IsString()
  id!: string;
  
  @ApiProperty({
    description: "Chapter number",
    example: 1,
    type: Number,
  })
  @IsNumber()
  @Type(() => Number)
  number!: number;
}