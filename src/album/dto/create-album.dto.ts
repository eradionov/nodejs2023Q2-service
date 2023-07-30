import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly name: string;

  @IsInt()
  @ApiProperty()
  public readonly year: number;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  public readonly artistId: string | null;
}
