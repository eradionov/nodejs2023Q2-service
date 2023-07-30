import { Expose } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from '../dto/update-track.dto';

export class Track {
  @Expose({ name: 'id' })
  private _id: string;

  @Expose({ name: 'name' })
  private _name: string;

  @Expose({ name: 'artistId' })
  private _artistId: string | null;

  @Expose({ name: 'albumId' })
  private _albumId: string | null;

  @Expose({ name: 'duration' })
  private _duration: number;

  private constructor(
    name: string,
    duration: number,
    artistId: string | null,
    albumId: string | null,
  ) {
    this._id = uuidv4();
    this._name = name;
    this._duration = duration;
    this._artistId = artistId;
    this._albumId = albumId;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get artistId(): string | null {
    return this._artistId;
  }

  get albumId(): string | null {
    return this._albumId;
  }

  get duration(): number {
    return this._duration;
  }

  update(updateTrackDto: UpdateTrackDto) {
    this._name = updateTrackDto.name;
    this._duration = updateTrackDto.duration;
    this._artistId = updateTrackDto.artistId;
    this._albumId = updateTrackDto.albumId;

    return this;
  }

  static create(
    name: string,
    duration: number,
    artistId: string | null,
    albumId: string | null,
  ) {
    return new Track(name, duration, artistId, albumId);
  }
}
