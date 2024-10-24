import { Get, Controller as NestController, Query } from '@nestjs/common';

import { Controller } from 'core/controller';

import type { Request, Response } from 'express';
import { BusinessError } from 'src/errors/BusinessError';
import { UnknownError } from 'src/errors/UnknownError';
import { FailureOutput, Input, SuccessOutput } from './list-shows-by-ids.types';
import { ListShowsByIdsUseCase } from './list-shows-by-ids.use-case';

@NestController('search-serie')
export class ListShowsByIdsController extends Controller<
  Input,
  SuccessOutput,
  FailureOutput
> {
  constructor(private readonly useCase: ListShowsByIdsUseCase) {
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
        ids: input.ids,
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
