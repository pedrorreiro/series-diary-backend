import { Get, Controller as NestController, Query } from '@nestjs/common';

import { Controller } from 'core/controller';

import type { Request, Response } from 'express';
import { BusinessError } from 'src/errors/BusinessError';
import { UnknownError } from 'src/errors/UnknownError';
import {
  FailureOutput,
  GetShowByIdUseCase,
  SuccessOutput,
} from './get-show-by-id.use-case';
import { Input } from './get-show-by-id.types';

@NestController('get-show-by-id')
export class GetShowByIdController extends Controller<
  Input,
  SuccessOutput,
  FailureOutput
> {
  constructor(private readonly useCase: GetShowByIdUseCase) {
    super();
  }
  @Get()
  async handle(
    req: Request,
    res: Response,
    @Query() input: Input,
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
