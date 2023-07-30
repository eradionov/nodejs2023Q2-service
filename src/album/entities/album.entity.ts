import { v4 as uuidv4 } from 'uuid';
import { Expose } from 'class-transformer';
import { UpdateAlbumDto } from '../dto/update-album.dto';

export class Album {
  @Expose({ name: 'id' })
  private _id: string;

  @Expose({ name: 'name' })
  private _name: string;

  @Expose({ name: 'year' })
  private _year: number;

  @Expose({ name: 'artistId' })
  private _artistId: string | null;

  private constructor(
    name: string,
    year: number,
    artistId: string | null = null,
  ) {
    this._id = uuidv4();
    this._name = name;
    this._year = year;
    this._artistId = artistId;
  }

  public update(updateAlbumDto: UpdateAlbumDto) {
    if (undefined !== updateAlbumDto?.name) {
      this._name = updateAlbumDto.name;
    }

    if (undefined !== updateAlbumDto?.year) {
      this._year = updateAlbumDto.year;
    }

    this._artistId = updateAlbumDto.artistId;

    return this;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get year(): number {
    return this._year;
  }

  get artistId(): string | null {
    return this._artistId;
  }

  static create(name: string, year: number, artistId: string | null = null) {
    return new Album(name, year, artistId);
  }
}
