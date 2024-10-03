import { PrismaUserRepository } from '@/entities/user/user.repository';
import { Module } from '@nestjs/common';
import { CreateUserController } from './create-user.controller';
import { PrismaCreateUserQuery } from './create-user.query';
import { CreateUserUseCase } from './create-user.use-case';

@Module({
  controllers: [CreateUserController],
  providers: [
    {
      provide: CreateUserUseCase,
      useFactory: (
        userRepository: PrismaUserRepository,
        query: PrismaCreateUserQuery,
      ) => {
        return new CreateUserUseCase(userRepository, query);
      },
      inject: [PrismaUserRepository, PrismaCreateUserQuery],
    },
    PrismaUserRepository,
    PrismaCreateUserQuery,
  ],
})
export class CreateUserModule {}
