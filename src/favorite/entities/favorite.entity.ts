import { Expose } from 'class-transformer';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Track } from '../../track/entities/track.entity';

export class Favorite {
  @Expose({ name: 'artist' })
  private _artist: Artist | null;

  @Expose({ name: 'album' })
  private _album: Album | null;

  @Expose({ name: 'track' })
  private _track: Track | null;

  public constructor(
    artist: Artist | null = null,
    album: Album | null = null,
    track: Track | null = null,
  ) {
    if (artist === null && album === null && track === null) {
      throw new Error('Favorite entity is invalid');
    }

    this._artist = artist;
    this._album = album;
    this._track = track;
  }

  get artist(): Artist {
    return this._artist;
  }

  get album(): Album {
    return this._album;
  }

  get track(): Track {
    return this._track;
  }
}
