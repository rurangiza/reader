
import { SignUpDto } from './sign-up.dto';
import { ApiSchema, OmitType } from '@nestjs/swagger';


@ApiSchema({
  description: 'Login credentials',
})
export class SignInDto extends OmitType(SignUpDto, ['username']) {}
