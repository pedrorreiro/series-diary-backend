import { Either, right, wrong } from '@/errors/either';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { config } from 'config';
import { handleAxiosResponse, setRequestInterceptors } from '../utils';
import { SerieServiceError } from './errors';
import {
  ISerieService,
  QuerySerieRawResponse,
  QuerySerieResponse,
  ShowPayloadRawResponse,
  ShowPayloadResponse,
} from './types';

@Injectable()
export class SerieService implements ISerieService {
  private language: string = 'pt-BR';

  private request: AxiosInstance;

  constructor() {
    this.request = axios.create({
      baseURL: config.tmdb.baseUrl as string,
    });

    this.request.defaults.baseURL = config.tmdb.baseUrl as string;
    this.request.defaults.headers.common['Content-Type'] = 'application/json';

    setRequestInterceptors(this.request);
  }

  async searchSerie(
    query: string,
    page: number,
  ): Promise<Either<SerieServiceError, QuerySerieResponse>> {
    try {
      console.log(page);
      const url = `/search/tv?query=${query}&language=${this.language}&page=${page}`;
      const response = this.request.get(url);

      const rawResponse =
        await handleAxiosResponse<QuerySerieRawResponse>(response);

      if (rawResponse.isRight()) {
        const { page, results, total_pages, total_results } =
          rawResponse.value as QuerySerieRawResponse;

        const mappedResults = results.map((result) => ({
          adult: result.adult,
          id: result.id,
          originCountry: result.origin_country,
          originalLanguage: result.original_language,
          originalName: result.original_name,
          overview: result.overview,
          popularity: result.popularity,
          posterPath: `https://image.tmdb.org/t/p/w500/${result.poster_path}`,
          firstAirDate: result.first_air_date,
          name: result.name,
          voteAverage: Number(result.vote_average.toFixed(1)),
          voteCount: result.vote_count,
        }));

        const parsedResponse = {
          page,
          results: mappedResults,
          totalPages: total_pages,
          totalResults: total_results,
        };

        return right(parsedResponse);
      }
    } catch (error) {
      return wrong(new SerieServiceError());
    }
  }

  async getShowById(
    id: string,
  ): Promise<Either<SerieServiceError, ShowPayloadResponse>> {
    const url = `/tv/${id}?language=${this.language}`;

    const response = this.request.get(url);

    const rawResponse =
      await handleAxiosResponse<ShowPayloadRawResponse>(response);

    if (rawResponse.isRight()) {
      const {
        backdrop_path,
        poster_path,
        overview,
        number_of_seasons,
        vote_average,
        first_air_date,
        last_air_date,
        genres,
      } = rawResponse.value as ShowPayloadRawResponse;

      const mappedResults = {
        backdropPath: backdrop_path,
        posterPath: poster_path,
        overview: overview,
        numberOfSeasons: number_of_seasons,
        voteAverage: vote_average,
        firstAirDate: first_air_date,
        lastAirDate: last_air_date,
        totalDuration: 0,
        genres,
      };

      return right(mappedResults);
    }
  }
  catch(error) {
    return wrong(new SerieServiceError());
  }
}
