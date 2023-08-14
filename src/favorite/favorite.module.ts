import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { FavoriteArtist } from './entities/favorite_artist.entity';
import { FavoriteTrack } from './entities/favorite_track.entity';
import { FavoriteAlbum } from './entities/favorite_album.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoriteArtist,
      FavoriteTrack,
      FavoriteAlbum,
      Album,
      Artist,
      Track,
    ]),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
