import { prisma } from '@database/client';
import { Injectable } from '@nestjs/common';
import { Show } from './show.entity';

export interface ShowRepository {
  getById: (id: number) => Promise<Show | null>;
  create: (user: Show) => Promise<Show>;
  update: (user: Show) => Promise<Show>;
}

@Injectable()
export class PrismaShowRepository implements ShowRepository {
  async getById(id: number): Promise<Show | null> {
    const user = await prisma.show.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return Show.mapFromPrisma(user);
  }

  async create(user: Show): Promise<Show> {
    const createdShow = await prisma.show.create({
      data: {
        id: user.id,
        name: user.name,
        overview: user.overview,
        tagline: user.tagline,
        numberOfEpisodes: user.numberOfEpisodes,
        numberOfSeasons: user.numberOfSeasons,
        firstAirDate: user.firstAirDate,
        lastAirDate: user.lastAirDate,
        posterUrl: user.posterUrl,
        backdropUrl: user.backdropUrl,
        voteAverage: user.voteAverage,
        status: user.status,
        genres: user.genres,
      },
    });

    return Show.mapFromPrisma(createdShow);
  }

  async update(user: Show): Promise<Show> {
    const updatedShow = await prisma.show.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        overview: user.overview,
        tagline: user.tagline,
        numberOfEpisodes: user.numberOfEpisodes,
        numberOfSeasons: user.numberOfSeasons,
        firstAirDate: user.firstAirDate,
        lastAirDate: user.lastAirDate,
        posterUrl: user.posterUrl,
        backdropUrl: user.backdropUrl,
        voteAverage: user.voteAverage,
        status: user.status,
        genres: user.genres,
      },
    });

    return Show.mapFromPrisma(updatedShow);
  }
}

@Injectable()
export class MockShowRepository implements ShowRepository {
  create: jest.Mock = jest.fn((user: Show) => Promise.resolve(user));
  update: jest.Mock = jest.fn((user: Show) => Promise.resolve(user));
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getById: jest.Mock = jest.fn((_id: string) => Promise.resolve(null));
}
