import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';
import { ApiProperty } from '@nestjs/swagger';

export class Response {
  @ApiProperty({ type: String, isArray: true })
  public readonly artists: Artist[];

  @ApiProperty({ type: String, isArray: true })
  public readonly albums: Album[];

  @ApiProperty({ type: String, isArray: true })
  public readonly tracks: Track[];
  constructor(artists: Artist[], albums: Album[], tracks: Track[]) {
    this.albums = albums;
    this.artists = artists;
    this.tracks = tracks;
  }
}
