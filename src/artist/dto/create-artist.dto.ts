import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly name: string;

  @IsBoolean()
  @ApiProperty()
  public readonly grammy: boolean;
}
