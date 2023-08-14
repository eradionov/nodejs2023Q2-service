import { UpdateAlbumDto } from '../dto/update-album.dto';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ length: 30 }) name: string;

  @Column('int') year: number;

  @ManyToOne(() => Artist, (Artist) => Artist.id, {
    onDelete: 'SET NULL',
  })
  artist: Artist | null;

  private constructor(
    name: string,
    year: number,
    artist: Artist | null = null,
  ) {
    this.name = name;
    this.year = year;
    this.artist = artist;
  }

  public update(updateAlbumDto: UpdateAlbumDto, artist?: Artist) {
    if (undefined !== updateAlbumDto?.name) {
      this.name = updateAlbumDto.name;
    }

    if (undefined !== updateAlbumDto?.year) {
      this.year = updateAlbumDto.year;
    }

    if (undefined !== updateAlbumDto?.artistId) {
      this.artist = artist || null;
    }

    return this;
  }

  static create(name: string, year: number, artist: Artist | null = null) {
    return new Album(name, year, artist);
  }
}
