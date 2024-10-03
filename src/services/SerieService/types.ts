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

export type ShowPayloadResponse = object;
