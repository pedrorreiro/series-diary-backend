import { HttpException } from '@nestjs/common';

export class BusinessError extends HttpException {
  constructor(message: string, statusCode: number) {
    const name = new.target.name;

    super(
      {
        statusCode,
        name,
        message,
      },
      statusCode,
    );
  }
}
