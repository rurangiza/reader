import { ApiSchema, OmitType } from '@nestjs/swagger';

import { BookDto } from './book.dto';

@ApiSchema({
  description:
    'DTO representing a book entity returned in API responses, including all book details except the chapters array.',
})
export class BookResponseDto extends OmitType(BookDto, ['chapters']) {}
