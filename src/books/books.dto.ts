import {IsNotEmpty, MinLength} from 'class-validator';

export class CreateBookDto {
  @MinLength(1)
  @IsNotEmpty()
  name: string;

  @MinLength(1)
  @IsNotEmpty()
  genre: string;
}

export class UpdateBookDto {
  @MinLength(1)
  @IsNotEmpty()
  name: string;

  @MinLength(1)
  @IsNotEmpty()
  genre: string;
}
