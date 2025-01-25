import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
