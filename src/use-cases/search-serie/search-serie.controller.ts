import { Get, Controller as NestController, Query } from '@nestjs/common';

import { Controller } from 'core/controller';

import type { Request, Response } from 'express';
import { BusinessError } from 'src/errors/BusinessError';
import { UnknownError } from 'src/errors/UnknownError';
import { Input } from './search-serie.types';
import {
  FailureOutput,
  SearchSerieUseCase,
  SuccessOutput,
} from './search-serie.use-case';

@NestController('search-serie')
export class SearchSerieController extends Controller<
  Input,
  SuccessOutput,
  FailureOutput
> {
  constructor(private readonly useCase: SearchSerieUseCase) {
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
        query: input.query,
        page: input.page,
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
