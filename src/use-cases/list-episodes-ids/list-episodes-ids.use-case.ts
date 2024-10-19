import { Either, right, wrong } from 'src/errors/either';

import { ISerieService, Season } from '@/services/SerieService/types';
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
    let seasonNumbersList = input.seasonNumbers || [];
    let numberOfSeasons = seasonNumbersList.length;

    if (seasonNumbersList.length === 0) {
      const getShowDetailsResult = await this.serieService.getShowById(
        input.showId,
      );

      if (getShowDetailsResult.isWrong()) {
        return wrong(getShowDetailsResult.value);
      }

      numberOfSeasons = getShowDetailsResult.value.numberOfSeasons;
      seasonNumbersList = Array.from(
        { length: numberOfSeasons },
        (_, i) => i + 1,
      );
    }

    const maxSeasonsPerCall = 20;
    const totalCalls = Math.ceil(numberOfSeasons / maxSeasonsPerCall);

    const callPromises = Array.from({ length: totalCalls }, (_, i) =>
      this.serieService.getSeasonsByIds(
        input.showId,
        seasonNumbersList.slice(
          i * maxSeasonsPerCall,
          (i + 1) * maxSeasonsPerCall,
        ),
      ),
    );

    const results = await Promise.all(callPromises);

    const failedResult = results.find((result) => result.isWrong());
    if (failedResult) {
      return wrong(failedResult.value);
    }

    const seasons = results.flatMap((result) => result.value as Season[]);
    const episodesIds = seasons.flatMap((season) =>
      season.episodes.map((episode) => episode.id),
    );

    return right(episodesIds);
  }
}
