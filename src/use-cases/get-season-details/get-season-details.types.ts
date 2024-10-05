import { Season } from '@/services/SerieService/types';
import { IsNotEmpty } from 'class-validator';

export type FailureOutput = Error;
export type SuccessOutput = Season;

export class Input {
  @IsNotEmpty()
  showId: number;

  @IsNotEmpty()
  season: number;
}
