import { Request, Response } from 'express';

export abstract class Controller<Input, SuccessOutput, FailureOutput> {
  protected abstract handle(
    req: Request,
    res: Response,
    input: Input,
  ): Promise<SuccessOutput | FailureOutput>;
}
