import { Either, right } from 'src/errors/either';

import { ISerieService } from '@/services/SerieService/types';
import { UseCase } from '@core/use-case';
import { FailureOutput, Input, SuccessOutput } from './list-shows-by-ids.types';

export class ListShowsByIdsUseCase extends UseCase<
  Input,
  FailureOutput,
  SuccessOutput
> {
  constructor(readonly serieService: ISerieService) {
    super();
  }

  async execute(input: Input): Promise<Either<FailureOutput, SuccessOutput>> {
    const response = await Promise.all(
      input.ids.map((id) => this.serieService.getShowById(id)),
    );

    return right(response.map(show => {
      return {
        name: 
      }
    }))
  }
}
