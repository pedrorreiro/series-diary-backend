import { HttpStatus } from '@nestjs/common';
import { BusinessError } from 'src/errors/BusinessError';

export class UserAlreadyExistsError extends BusinessError {
  constructor() {
    super('User already exists with this email', HttpStatus.CONFLICT);
  }
}
