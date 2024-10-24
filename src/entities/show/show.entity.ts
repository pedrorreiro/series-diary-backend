import { Prisma, Show as PrismaShow } from '@prisma/client';
import { Genre, ShowConstructor } from './show.type';

export class Show {
  id?: number;
  name: string;
  overview: string;
  tagline: string;
  numberOfEpisodes: number;
  numberOfSeasons: number;
  firstAirDate: Date;
  lastAirDate: Date;
  posterUrl: string;
  backdropUrl: string;
  voteAverage: number;
  status: string;
  genres: {
    id: number;
    name: string;
  }[];

  createdAt?: Date;
  updatedAt?: Date;

  constructor(show: ShowConstructor) {
    this.id = show.id;
    this.name = show.name;
    this.overview = show.overview;
    this.tagline = show.tagline;
    this.numberOfEpisodes = show.numberOfEpisodes;
    this.numberOfSeasons = show.numberOfSeasons;
    this.firstAirDate = show.firstAirDate;
    this.lastAirDate = show.lastAirDate;
    this.posterUrl = show.posterUrl;
    this.backdropUrl = show.backdropUrl;
    this.voteAverage = show.voteAverage;
    this.status = show.status;
    this.genres = show.genres;
    this.createdAt = show.createdAt;
    this.updatedAt = show.updatedAt;
  }

  static mapFromPrisma(user: PrismaShow): Show {
    const genres = user.genres as Prisma.JsonArray;

    const mappedGenres = genres.map((genre) => {
      const prismaGenre = genre as Genre;

      return {
        id: prismaGenre.id,
        name: prismaGenre.name,
      };
    });

    return new Show({
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
      genres: mappedGenres,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
