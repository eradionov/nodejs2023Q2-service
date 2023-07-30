import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsInt()
  public readonly year: number;

  public readonly artistId: string | null;
}
