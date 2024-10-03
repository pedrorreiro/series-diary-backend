import { MockUserRepository } from '@/entities/user/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserController } from './create-user.controller';
import { PrismaCreateUserQuery } from './create-user.query';
import { Input } from './create-user.types';
import { CreateUserUseCase } from './create-user.use-case';

const input: Input = {
  name: 'John Doe',
  email: 'john@gmail.com',
};

describe('CreateUserController', () => {
  let createUserController: CreateUserController;
  let createUserQuery: PrismaCreateUserQuery;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateUserController],
      providers: [
        {
          provide: CreateUserUseCase,
          useFactory: (
            userRepository: MockUserRepository,
            query: PrismaCreateUserQuery,
          ) => {
            return new CreateUserUseCase(userRepository, query);
          },
          inject: [MockUserRepository, PrismaCreateUserQuery],
        },
        MockUserRepository,
        PrismaCreateUserQuery,
      ],
    }).compile();

    createUserController =
      module.get<CreateUserController>(CreateUserController);

    createUserQuery = module.get<PrismaCreateUserQuery>(PrismaCreateUserQuery);
  });

  describe('CreateUserUseCase', () => {
    it('should create a user successfully', async () => {
      jest.spyOn(createUserQuery, 'userExistsByEmail').mockResolvedValue(false);

      const result = await createUserController.handle(input);

      expect(result).toBe(undefined);
    });
  });
});
