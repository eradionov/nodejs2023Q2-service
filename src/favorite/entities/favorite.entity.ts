import { Album } from '../../album/entities/album.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Track } from '../../track/entities/track.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  // @ManyToOne(() => Artist, (Artist) => Artist.id, {
  //   onDelete: 'CASCADE',
  // })
  artist: Artist | null;

  // @ManyToOne(() => Album, (Album) => Album.id, {
  //   onDelete: 'CASCADE',
  // })
  album: Album | null;

  // @ManyToOne(() => Track, (Track) => Track.id, {
  //   onDelete: 'CASCADE',
  // })
  track: Track | null;

  public constructor(
    artist: Artist | null = null,
    album: Album | null = null,
    track: Track | null = null,
  ) {
    this.artist = artist;
    this.album = album;
    this.track = track;
  }
}
