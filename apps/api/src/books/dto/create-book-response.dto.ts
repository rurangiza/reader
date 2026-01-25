import { OmitType } from '@nestjs/swagger';

import { BookDto } from './book.dto';

export class CreateBookResponseDto extends OmitType(BookDto, ['chapters']) {}
