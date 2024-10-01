import { IsNotEmpty } from 'class-validator';

export class Input {
  @IsNotEmpty()
  query: string;

  @IsNotEmpty()
  page: number;
}
