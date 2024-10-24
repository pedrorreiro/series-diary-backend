import { IsNotEmpty } from 'class-validator';

export type FailureOutput = Error;

export type SuccessOutput = {
  posterUrl: string;
  name: string;
  rating: number;
}[];

export class Input {
  ids: number[];

  @IsNotEmpty()
  page: number;
}
