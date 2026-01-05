import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import type { UUID } from 'crypto';

export class RemoveBookParamsDto {
  @ApiProperty({
    type: String,
    example: '2691fc73-e784-4e4c-a266-231f5992bfce',
    description: 'ID of the book',
  })
  @IsUUID()
  bookId!: UUID;
}
