import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';

export class CreateMemberDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;
}

export class UpdateMemberDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
