import { ApiSchema, OmitType } from '@nestjs/swagger';

import { SignUpDto } from './sign-up.dto';

@ApiSchema({
  description: 'Login credentials',
})
export class SignInDto extends OmitType(SignUpDto, ['username']) {}
