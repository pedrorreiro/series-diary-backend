import { Get, Controller as NestController, Param } from '@nestjs/common';

import { Controller } from 'core/controller';

import type { Request, Response } from 'express';
import { BusinessError } from 'src/errors/BusinessError';
import { UnknownError } from 'src/errors/UnknownError';
import { FailureOutput, Input, SuccessOutput } from './get-show-by-id.types';
import { GetShowByIdUseCase } from './get-show-by-id.use-case';

@NestController('get-show-by-id')
export class GetShowByIdController extends Controller<
  Input,
  SuccessOutput,
  FailureOutput
> {
  constructor(private readonly useCase: GetShowByIdUseCase) {
    super();
  }
  @Get(':id')
  async handle(
    req: Request,
    res: Response,
    @Param() input: Input,
  ): Promise<SuccessOutput | FailureOutput> {
    let error: BusinessError;

    try {
      const response = await this.useCase.execute({
        id: input.id,
      });

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
