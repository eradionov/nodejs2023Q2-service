import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from '../../track/entities/track.entity';

@Entity()
export class FavoriteTrack {
  constructor(track: Track) {
    this.track = track;
  }

  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @ManyToOne(() => Track, (Track) => Track.id, {
    onDelete: 'CASCADE',
  })
  track: Track;
}
