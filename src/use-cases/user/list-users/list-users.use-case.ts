import { User } from 'src/entities/user/user.entity';
import { Either, right } from 'src/errors/either';
import { UseCase } from '../../../../core/use-case';
import { ListUsersQuery } from './list-users.query';
import { Input } from './list-users.types';

export type FailureOutput = Error;
export type SuccessOutput = User[];

export class ListUsersUseCase extends UseCase<
  Input,
  FailureOutput,
  SuccessOutput
> {
  constructor(private readonly query: ListUsersQuery) {
    super();
  }

  async execute(): Promise<Either<FailureOutput, SuccessOutput>> {
    const users = await this.query.listUsers();

    return right(users);
  }
}
