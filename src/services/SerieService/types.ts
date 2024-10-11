import { Either } from '@/errors/either';
import { SerieServiceError } from './errors';

export interface ISerieService {
  searchSerie(
    query: string,
    page: number,
  ): Promise<Either<SerieServiceError, QuerySerieResponse>>;

  getShowById(
    id: string,
  ): Promise<Either<SerieServiceError, ShowPayloadResponse>>;

  getSeasonById(
    showId: number,
    season: number,
  ): Promise<Either<SerieServiceError, Season>>;
}

export type QuerySerieRawResponse = {
  page: number;
  results: Array<{
    adult: boolean;
    id: number;
    origin_country: Array<string>;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    first_air_date: string;
    name: string;
    vote_average: number;
    vote_count: number;
  }>;
  total_pages: number;
  total_results: number;
};

export type QuerySerieResponse = {
  page: number;
  results: Array<{
    adult: boolean;
    id: number;
    originCountry: Array<string>;
    originalLanguage: string;
    originalName: string;
    overview: string;
    popularity: number;
    posterPath: string;
    firstAirDate: string;
    name: string;
    voteAverage: number;
    voteCount: number;
  }>;
  totalPages: number;
  totalResults: number;
};

export type ShowPayloadRawResponse = {
  adult: boolean;
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    original_name: string;
    gender: number;
    profile_path: string;
  }[];
  episode_run_time: any[];
  first_air_date: string;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  in_production: boolean;
  language: string[];
  last_air_date: string;
  last_episode_to_air: {
    id: number;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: string;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
  };
  name: string;
  next_episode_to_air: any | null;
  networks: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  seasons: {
    air_date: string;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    season_number: number;
    vote_average: number;
  }[];
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: ShowType;
  tagline: string;
  type: ShowType;
  vote_average: number;
  vote_count: number;
};

export type RawSeason = {
  _id: number;
  air_date: string;
  episodes: {
    air_date: string;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    show_id: number;
    runtime: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
  }[];
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
};

export type RawSeasons = {
  [key in `season/${number}`]: RawSeason;
}[];

export type Season = {
  id: number;
  airDate: string;
  episodes: {
    airDate: string;
    episodeNumber: number;
    id: number;
    name: string;
    overview: string;
    productionCode: string;
    seasonNumber: number;
    runtime: string;
    showId: number;
    stillPath: string;
    voteAverage: number;
    voteCount: number;
  }[];
  name: string;
  overview: string;
  posterPath: string;
  seasonNumber: number;
};

export type RawShowWithEpisodiesResponse = ShowPayloadRawResponse & RawSeasons;

export enum ShowType {
  Documentary = 'Documentary',
  News = 'News',
  Miniseries = 'Miniseries',
  Reality = 'Reality',
  Scripted = 'Scripted',
  TalkShow = 'Talk Show',
  Video = 'Video',
}

export type ShowPayloadResponse = {
  name: string;
  backdropPath: string;
  posterPath: string;
  overview: string;
  numberOfSeasons: number;
  voteAverage: number;
  firstAirDate: string;
  lastAirDate: string;
  totalDuration: number;
  tagline: string;
  type: ShowType;
  genres: {
    id: number;
    name: string;
  }[];
  numberOfEpisodes: number;
  status: string;
};
