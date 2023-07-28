import { IsString, Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(5, 15)
  login: string;

  @MinLength(8)
  password: string;
}
