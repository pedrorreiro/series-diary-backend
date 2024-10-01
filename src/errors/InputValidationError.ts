import { HttpStatus } from '@nestjs/common';
import { BusinessError } from './BusinessError';

export class InputValidationError extends BusinessError {
  name: string;

  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
    this.name = this.constructor.name;
  }
}
