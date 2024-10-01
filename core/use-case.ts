import { Either } from 'src/errors/either';

export abstract class UseCase<
  Input,
  FailureOutput extends Error,
  SuccessOutput,
> {
  protected abstract execute(
    input?: Input,
  ): Promise<Either<FailureOutput, SuccessOutput>>;
}
