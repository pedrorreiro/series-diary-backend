import { IsEmail, IsNotEmpty } from 'class-validator';

export class Input {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
