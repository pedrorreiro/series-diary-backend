import { Either, right, wrong } from 'src/errors/either';

import { ISerieService } from '@/services/SerieService/types';
import { UseCase } from '@core/use-case';
import { FailureOutput, Input, SuccessOutput } from './list-episodes-ids.types';

export class ListEpisodesIdsUseCase extends UseCase<
  Input,
  FailureOutput,
  SuccessOutput
> {
  constructor(readonly serieService: ISerieService) {
    super();
  }

  async execute(input: Input): Promise<Either<FailureOutput, SuccessOutput>> {
    let seasonNumbersList: number[] = input.seasonNumbers;
    if (!input.seasonNumbers) {
      const getShowDetailsResult = await this.serieService.getShowById(
        input.showId,
      );

      if (getShowDetailsResult.isWrong()) {
        return wrong(getShowDetailsResult.value);
      }

      seasonNumbersList = Array.from(
        { length: getShowDetailsResult.value.numberOfSeasons },
        (_, i) => i + 1,
      );
    }

    const result = await this.serieService.getSeasonsByIds(
      input.showId,
      seasonNumbersList,
    );

    if (result.isWrong()) {
      return wrong(result.value);
    }

    const episodesIds = result.value.flatMap((season) =>
      season.episodes.map((episode) => episode.id),
    );

    return right(episodesIds);
  }
}
