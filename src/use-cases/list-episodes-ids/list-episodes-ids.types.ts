import { SerieServiceError } from '@/services/SerieService/errors';
import { IsNotEmpty } from 'class-validator';

export type FailureOutput = SerieServiceError;
export type SuccessOutput = number[];

export class Input {
  @IsNotEmpty()
  showId: number;

  seasonNumbers: number[];
}
