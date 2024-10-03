import { Get, Controller as NestController } from '@nestjs/common';

import { Controller } from 'core/controller';

import { BusinessError } from 'src/errors/BusinessError';
import { UnknownError } from 'src/errors/UnknownError';
import { Input } from './list-users.types';
import {
  FailureOutput,
  ListUsersUseCase,
  SuccessOutput,
} from './list-users.use-case';

@NestController('list-users')
export class ListUsersController extends Controller<
  Input,
  SuccessOutput,
  FailureOutput
> {
  constructor(private readonly useCase: ListUsersUseCase) {
    super();
  }
  @Get()
  async handle(): Promise<SuccessOutput | FailureOutput> {
    let error: BusinessError;

    try {
      const response = await this.useCase.execute();

      if (!response) return undefined;

      if (response.isRight()) {
        return response.value;
      }

      error = response.value as BusinessError;
    } catch (error) {
      console.log(error);
      error = new UnknownError();
    }

    throw error;
  }
}
