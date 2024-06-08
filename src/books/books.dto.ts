import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateBookDto {
  @MinLength(1)
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @MinLength(1)
  @IsNotEmpty()
  @ApiProperty()
  genre: string;
}

export class UpdateBookDto {
  @MinLength(1)
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @MinLength(1)
  @IsNotEmpty()
  @ApiProperty()
  genre: string;
}
