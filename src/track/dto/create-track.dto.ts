import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  public readonly artistId: string | null;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  public readonly albumId: string | null;

  @IsInt()
  @ApiProperty()
  public readonly duration: number;
}
