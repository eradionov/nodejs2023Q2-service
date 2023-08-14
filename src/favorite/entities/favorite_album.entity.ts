import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../album/entities/album.entity';

@Entity()
export class FavoriteAlbum {
  constructor(album: Album) {
    this.album = album;
  }

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Album, (Album) => Album.id, {
    onDelete: 'CASCADE',
  })
  album: Album;
}
