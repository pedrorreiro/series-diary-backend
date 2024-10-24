export type ShowConstructor = {
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
  genres: Genre[];

  createdAt?: Date;
  updatedAt?: Date;
};

export type Genre = {
  id: number;
  name: string;
};
