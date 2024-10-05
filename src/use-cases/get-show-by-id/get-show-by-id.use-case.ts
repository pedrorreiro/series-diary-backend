import { Either } from 'src/errors/either';

import { UseCase } from '@core/use-case';
import { Input } from './get-show-by-id.types';
import {
  ShowPayloadResponse,
  ISerieService,
} from '@/services/SerieService/types';

export type FailureOutput = Error;
export type SuccessOutput = ShowPayloadResponse;

export class GetShowByIdUseCase extends UseCase<
  Input,
  FailureOutput,
  SuccessOutput
> {
  constructor(readonly serieService: ISerieService) {
    super();
  }

  async execute(input: Input): Promise<Either<FailureOutput, SuccessOutput>> {
    const result = await this.serieService.getShowById(input.id);

    return result;
  }
}
