import { User } from 'src/entities/user/user.entity';
import { UserRepository } from 'src/entities/user/user.repository';
import { Either, wrong } from 'src/errors/either';
import { UseCase } from '../../../../core/use-case';
import { UserAlreadyExistsError } from './create-user.errors';
import { CreateUserQuery } from './create-user.query';
import { Input } from './create-user.types';

export type FailureOutput = UserAlreadyExistsError;
export type SuccessOutput = void;

export class CreateUserUseCase extends UseCase<
  Input,
  FailureOutput,
  SuccessOutput
> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly query: CreateUserQuery,
  ) {
    super();
  }

  async execute(input: Input): Promise<Either<FailureOutput, SuccessOutput>> {
    const userExistsByEmail = await this.query.userExistsByEmail(input.email);

    if (userExistsByEmail) {
      return wrong(new UserAlreadyExistsError());
    }

    const userEntity = new User({
      name: input.name,
      email: input.email,
    });

    this.userRepository.create(userEntity);
  }
}
