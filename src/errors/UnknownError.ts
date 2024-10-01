import { HttpStatus } from '@nestjs/common';
import { BusinessError } from './BusinessError';

export class UnknownError extends BusinessError {
  name: string;

  constructor() {
    super('An unknown error has occurred', HttpStatus.INTERNAL_SERVER_ERROR);
    this.name = this.constructor.name;
  }
}
