import { Expose } from 'class-transformer';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../album/entities/album.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'id' })
  @ApiProperty({ name: 'id' })
  readonly id: string;

  @Column({ length: 30 })
  @Expose({ name: 'name' })
  @ApiProperty({ name: 'name' })
  name: string;

  @Column()
  @Expose({ name: 'grammy' })
  @ApiProperty({ name: 'grammy' })
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist, { cascade: true })
  albums: Album[];

  private constructor(name: string, grammy: boolean) {
    this.name = name;
    this.grammy = grammy;
  }

  update(dto: UpdateArtistDto) {
    if (undefined !== dto?.name) {
      this.name = dto?.name;
    }

    if (undefined !== dto?.grammy) {
      this.grammy = dto.grammy;
    }

    return this;
  }

  static create(name: string, grammy: boolean) {
    return new Artist(name, grammy);
  }
}
