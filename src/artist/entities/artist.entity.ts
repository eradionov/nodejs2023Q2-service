import { Expose } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from '../dto/update-artist.dto';

export class Artist {
  @Expose({ name: 'id' })
  private _id: string;

  @Expose({ name: 'name' })
  private _name: string;

  @Expose({ name: 'grammy' })
  private _grammy: boolean;

  private constructor(name: string, grammy: boolean) {
    this._id = uuidv4();
    this._name = name;
    this._grammy = grammy;
  }

  update(dto: UpdateArtistDto) {
    if (undefined !== dto?.name) {
      this._name = dto?.name;
    }

    if (undefined !== dto?.grammy) {
      this._grammy = dto.grammy;
    }

    return this;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get grammy(): boolean {
    return this._grammy;
  }

  static create(name: string, grammy: boolean) {
    return new Artist(name, grammy);
  }
}
