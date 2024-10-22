import { Get, Controller as NestController } from '@nestjs/common';

import { Controller } from 'core/controller';

import { BusinessError } from 'src/errors/BusinessError';
import { UnknownError } from 'src/errors/UnknownError';

import { FailureOutput, Input, SuccessOutput } from './health.types';
import { HealthUseCase } from './health.use-case';

@NestController('health')
export class HealthController extends Controller<
  Input,
  SuccessOutput,
  FailureOutput
> {
  constructor(private readonly useCase: HealthUseCase) {
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
