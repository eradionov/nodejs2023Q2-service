import { Artist } from '../../artist/entities/artist.entity';
import { ApiProperty } from '@nestjs/swagger';
import { AlbumResponse } from '../../album/dto/album-response';
import { TrackResponse } from '../../track/dto/track-response';

export class FavouriteResponse {
  @ApiProperty({ type: String, isArray: true })
  public readonly artists: Artist[];

  @ApiProperty({ type: String, isArray: true })
  public readonly albums: AlbumResponse[];

  @ApiProperty({ type: String, isArray: true })
  public readonly tracks: TrackResponse[];
  constructor(
    artists: Artist[] = [],
    albums: AlbumResponse[] = [],
    tracks: TrackResponse[] = [],
  ) {
    this.albums = albums;
    this.artists = artists;
    this.tracks = tracks;
  }
}
