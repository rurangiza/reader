import type { UUID } from 'crypto';

import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetBookParamsDto {
  @ApiProperty({
    description: 'ID of the book',
    example: '2691fc73-e784-4e4c-a266-231f5992bfce',
    type: String,
  })
  @IsUUID()
  bookId!: UUID;
}
