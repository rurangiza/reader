import { OmitType } from '@nestjs/swagger';
import { BookDto } from './book.dto';

export class GetBookDto extends OmitType(BookDto, ['chapters']) {}
