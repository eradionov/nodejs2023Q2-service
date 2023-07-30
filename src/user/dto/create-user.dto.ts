import { IsString, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @Length(5, 15)
  @ApiProperty()
  login: string;

  @MinLength(4)
  @ApiProperty()
  password: string;
}
