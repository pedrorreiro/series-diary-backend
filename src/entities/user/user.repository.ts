import { prisma } from '@database/client';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

export interface UserRepository {
  getById: (id: string) => Promise<User | null>;
  create: (user: User) => Promise<User>;
}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  async getById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return User.mapFromPrisma(user);
  }
  async create(user: User): Promise<User> {
    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
      },
    });

    return User.mapFromPrisma(createdUser);
  }
}

@Injectable()
export class MockUserRepository implements UserRepository {
  create: jest.Mock = jest.fn((user: User) => Promise.resolve(user));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getById: jest.Mock = jest.fn((_id: string) => Promise.resolve(null));
}
