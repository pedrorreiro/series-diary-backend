import { Either, right, wrong } from '@/errors/either';
import { Duration } from '@/value-objects/duration';
import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { config } from 'config';
import { handleAxiosResponse, setRequestInterceptors } from '../utils';
import { SerieServiceError } from './errors';
import {
  ISerieService,
  QuerySerieRawResponse,
  QuerySerieResponse,
  RawSeason,
  RawShowWithEpisodiesResponse,
  Season,
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
          posterPath: `https://image.tmdb.org/t/p/w500${result.poster_path}`,
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
    id: number,
  ): Promise<Either<SerieServiceError, ShowPayloadResponse>> {
    const url = `/tv/${id}?language=${this.language}`;

    const response = this.request.get(url);

    const rawResponse =
      await handleAxiosResponse<RawShowWithEpisodiesResponse>(response);

    if (rawResponse.isRight()) {
      const {
        id,
        name,
        backdrop_path,
        poster_path,
        overview,
        number_of_seasons,
        vote_average,
        first_air_date,
        last_air_date,
        tagline,
        type,
        genres,
        status,
        number_of_episodes,
      } = rawResponse.value as ShowPayloadRawResponse;

      const mappedResults = {
        id,
        name,
        backdropPath: `https://image.tmdb.org/t/p/w1280${backdrop_path}`,
        posterPath: `https://image.tmdb.org/t/p/w500${poster_path}`,
        overview,
        numberOfSeasons: number_of_seasons,
        numberOfEpisodes: number_of_episodes,
        voteAverage: Number(vote_average.toFixed(1)),
        firstAirDate: first_air_date,
        lastAirDate: last_air_date,
        tagline,
        type,
        totalDuration: 0,
        genres,
        status,
      };

      return right(mappedResults);
    } else {
      return wrong(new SerieServiceError());
    }
  }

  async getSeasonsByIds(
    showId: number,
    seasonNumbers: number[],
  ): Promise<Either<SerieServiceError, Season[]>> {
    let url = `/tv/${showId}?language=${this.language}&append_to_response=`;

    seasonNumbers = seasonNumbers.filter((sn) => !isNaN(sn));

    seasonNumbers.forEach((seasonNumber, index) => {
      url += `season/${seasonNumber}`;

      if (index < seasonNumbers.length - 1) {
        url += ',';
      }
    });

    const response = this.request.get(url);

    const rawResponse =
      await handleAxiosResponse<RawShowWithEpisodiesResponse>(response);

    if (rawResponse.isRight()) {
      const data = rawResponse.value as ShowPayloadRawResponse;

      let error: SerieServiceError | undefined;

      const seasons: Season[] = seasonNumbers.map((seasonNumber) => {
        const season = data[`season/${seasonNumber}`] as RawSeason;

        if (!season) {
          error = new SerieServiceError(`Season ${seasonNumber} not found`);
        }

        return {
          id: season._id,
          airDate: season.air_date,
          episodes: season.episodes.map((episode) => {
            const runtime = (Duration.create(episode.runtime) as Duration)
              .formatted;

            return {
              airDate: episode.air_date,
              episodeNumber: episode.episode_number,
              id: episode.id,
              name: episode.name,
              overview: episode.overview,
              productionCode: episode.production_code,
              seasonNumber: episode.season_number,
              showId: episode.show_id,
              seasonId: season._id,
              runtime: runtime,
              stillPath: `https://image.tmdb.org/t/p/w500${episode.still_path}`,
              voteAverage: Number(episode.vote_average.toFixed(1)),
              voteCount: episode.vote_count,
            };
          }),
          name: season.name,
          overview: season.overview,
          posterPath: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          seasonNumber: season.season_number,
        };
      });

      if (error) {
        return wrong(error);
      }

      return right(seasons);
    } else {
      return wrong(new SerieServiceError());
    }
  }
}
