import { BusinessError } from '@/errors/BusinessError';
import { HttpStatus } from '@nestjs/common';

export class SerieServiceError extends BusinessError {
  constructor() {
    super('Error on Serie Service', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
