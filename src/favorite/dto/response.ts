import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';

export class Response {
  constructor(
    public readonly artists: Artist[],
    public readonly albums: Album[],
    public readonly tracks: Track[],
  ) {}
}
