import { QuerySerieResponse } from '@/services/SerieService/types';
import { IsNotEmpty } from 'class-validator';

export type FailureOutput = Error;
export type SuccessOutput = QuerySerieResponse;

export class Input {
  @IsNotEmpty()
  query: string;

  @IsNotEmpty()
  page: number;
}
