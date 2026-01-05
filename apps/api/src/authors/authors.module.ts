import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';

@Module({
  providers: [AuthorsService],
})
export class AuthorsModule {}
