import { IsNotEmpty } from 'class-validator';

export class Input {
  @IsNotEmpty()
  id: string;
}
