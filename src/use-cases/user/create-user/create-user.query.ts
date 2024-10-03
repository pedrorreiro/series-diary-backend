import { prisma } from '@database/client';
import { Injectable } from '@nestjs/common';

export interface CreateUserQuery {
  userExistsByEmail(email: string): Promise<boolean>;
}

@Injectable()
export class PrismaCreateUserQuery implements CreateUserQuery {
  async userExistsByEmail(email: string): Promise<boolean> {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    return !!user;
  }
}
