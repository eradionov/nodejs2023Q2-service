import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Artist } from '../../artist/entities/artist.entity';

@Entity()
export class FavoriteArtist {
  constructor(artist: Artist) {
    this.artist = artist;
  }

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Artist, (Artist) => Artist.id, {
    onDelete: 'CASCADE',
  })
  artist: Artist;
}
