import { ShowPayloadResponse } from '@/services/SerieService/types';
import { IsNotEmpty } from 'class-validator';

export type FailureOutput = Error;
export type SuccessOutput = ShowPayloadResponse;

export class Input {
  @IsNotEmpty()
  id: number;
}
