import { Either, right } from 'src/errors/either';

import { UseCase } from '@core/use-case';
import { FailureOutput, Input, SuccessOutput } from './health.types';

export class HealthUseCase extends UseCase<
  Input,
  FailureOutput,
  SuccessOutput
> {
  constructor() {
    super();
  }

  async execute(): Promise<Either<FailureOutput, SuccessOutput>> {
    return right('Ping');
  }
}
