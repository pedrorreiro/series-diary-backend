import { Body, Controller as NestController, Post } from '@nestjs/common';
import { BusinessError } from 'src/errors/BusinessError';

import type { Request, Response } from 'express';

import { Controller } from '@core/controller';
import { UnknownError } from 'src/errors/UnknownError';
import { Input } from './create-user.types';
import {
  CreateUserUseCase,
  FailureOutput,
  SuccessOutput,
} from './create-user.use-case';

@NestController('create-user')
export class CreateUserController extends Controller<
  Input,
  SuccessOutput,
  FailureOutput
> {
  constructor(private readonly useCase: CreateUserUseCase) {
    super();
  }

  @Post()
  async handle(
    req: Request,
    res: Response,
    @Body() input: Input,
  ): Promise<SuccessOutput | FailureOutput> {
    let error: BusinessError;

    try {
      const response = await this.useCase.execute(input);

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
