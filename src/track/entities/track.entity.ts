import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'id' })
  @ApiProperty({ name: 'id' })
  readonly id: string;

  @Column({ unique: true })
  @Expose({ name: 'name' })
  @ApiProperty({ name: 'name' })
  name: string;

  @Expose({ name: 'artist' })
  @ApiProperty({ name: 'artist' })
  @ManyToOne(() => Artist, (Artist) => Artist.id, {
    onDelete: 'SET NULL',
  })
  artist: Artist | null;

  @Expose({ name: 'album' })
  @ApiProperty({ name: 'album' })
  @ManyToOne(() => Album, (Album) => Album.id, {
    onDelete: 'SET NULL',
  })
  album: Album | null;

  @Column()
  @Expose({ name: 'duration' })
  @ApiProperty({ name: 'duration' })
  duration: number;

  private constructor(
    name: string,
    duration: number,
    artist: Artist | null,
    album: Album | null,
  ) {
    this.name = name;
    this.duration = duration;
    this.artist = artist;
    this.album = album;
  }

  update(
    name: string,
    duration: number,
    artist: Artist | null,
    album: Album | null,
  ) {
    this.name = name;
    this.duration = duration;
    this.artist = artist;
    this.album = album;

    return this;
  }

  static create(
    name: string,
    duration: number,
    artist: Artist | null = null,
    album: Album | null = null,
  ) {
    return new Track(name, duration, artist, album);
  }
}
