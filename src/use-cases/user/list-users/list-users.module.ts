import { Module } from '@nestjs/common';

import { ListUsersController } from './list-users.controller';
import { ListUsersQuery, PrismaListUsersQuery } from './list-users.query';
import { ListUsersUseCase } from './list-users.use-case';

@Module({
  controllers: [ListUsersController],
  providers: [
    {
      provide: ListUsersUseCase,
      useFactory: (query: ListUsersQuery) => {
        return new ListUsersUseCase(query);
      },
      inject: [PrismaListUsersQuery],
    },
    PrismaListUsersQuery,
  ],
})
export class ListUsersModule {}
