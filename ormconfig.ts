import * as dotenv from 'dotenv';
import { Artist } from './src/artist/entities/artist.entity';
import { Album } from './src/album/entities/album.entity';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { User } from './src/user/entities/user.entity';
import { Track } from './src/track/entities/track.entity';
import { FavoriteArtist } from './src/favorite/entities/favorite_artist.entity';
import { FavoriteTrack } from './src/favorite/entities/favorite_track.entity';
import { FavoriteAlbum } from './src/favorite/entities/favorite_album.entity';
dotenv.config();

const configService = new ConfigService();

export default new DataSource({
  url: configService.get('DATABASE_DSN'),
  type: 'postgres',
  logging: false,
  synchronize: configService.get('DATABASE_SYNC'),
  entities: [
    Artist,
    Album,
    User,
    Track,
    FavoriteArtist,
    FavoriteTrack,
    FavoriteAlbum,
  ],
  migrationsRun: false,
  migrations: ['migrations/**'],
});
