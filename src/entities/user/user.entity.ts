import { User as PrismaUser } from '@prisma/client';
import { UserConstructor } from './user.type';

export class User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({ id, name, email, createdAt, updatedAt }: UserConstructor) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static mapFromPrisma(user: PrismaUser): User {
    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
