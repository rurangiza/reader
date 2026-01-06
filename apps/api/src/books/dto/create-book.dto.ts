import { ApiSchema, OmitType } from '@nestjs/swagger';

import { BookDto } from './book.dto';

@ApiSchema({
  description: 'DTO used for creating a new book.',
})
export class CreateBookDto extends OmitType(BookDto, ['id']) {}
