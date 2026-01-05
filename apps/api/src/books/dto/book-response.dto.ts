import { OmitType } from '@nestjs/swagger';
import { BookDto } from './book.dto';

export class BookResponseDto extends OmitType(BookDto, ['chapters']) {}
