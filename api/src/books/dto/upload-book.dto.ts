import { OmitType } from '@nestjs/swagger';
import { BookDto } from './book.dto';

export class UploadBookDto extends OmitType(BookDto, ['id']) {}
