import { Get, Controller as NestController, Query } from '@nestjs/common';

import { Controller } from 'core/controller';

import type { Request, Response } from 'express';
import { BusinessError } from 'src/errors/BusinessError';
import { UnknownError } from 'src/errors/UnknownError';
import { FailureOutput, Input, SuccessOutput } from './list-episodes-ids.types';
import { ListEpisodesIdsUseCase } from './list-episodes-ids.use-case';

@NestController('list-episodes-ids')
export class ListEpisodesIdsController extends Controller<
  Input,
  SuccessOutput,
  FailureOutput
> {
  constructor(private readonly useCase: ListEpisodesIdsUseCase) {
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
      let seasonNumbers: number[] | undefined;

      if (typeof input.seasonNumbers === 'string') {
        seasonNumbers = [Number(input.seasonNumbers)];
      } else if (Array.isArray(input.seasonNumbers)) {
        seasonNumbers = input.seasonNumbers.map((seasonNumber) =>
          Number(seasonNumber),
        );
      }

      const response = await this.useCase.execute({
        showId: input.showId,
        seasonNumbers,
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
