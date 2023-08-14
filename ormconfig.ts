import * as dotenv from 'dotenv';
import { Artist } from './src/artist/entities/artist.entity';
import { Album } from './src/album/entities/album.entity';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import {User} from "./src/user/entities/user.entity";
import {Track} from "./src/track/entities/track.entity";
import {Favorite} from "./src/favorite/entities/favorite.entity";
dotenv.config();

const configService = new ConfigService();

export default new DataSource({
  url: configService.get('DATABASE_DSN'),
  type: 'postgres',
  logging: false,
  synchronize: configService.get('DATABASE_SYNC'),
  entities: [Artist, Album, User, Track, Favorite],
  migrationsRun: false,
  migrations: ['migrations/**'],
});
