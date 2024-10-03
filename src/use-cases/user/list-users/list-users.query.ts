import { prisma } from '@database/client';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user/user.entity';

export interface ListUsersQuery {
  listUsers(): Promise<User[]>;
}

@Injectable()
export class PrismaListUsersQuery implements ListUsersQuery {
  async listUsers(): Promise<User[]> {
    const prismaUsers = await prisma.user.findMany();

    const users = prismaUsers.map((prismaUser) =>
      User.mapFromPrisma(prismaUser),
    );

    return users;
  }
}
