import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { FavoriteRepository } from './repository/favorite.repository';
import { ArtistRepository } from '../artist/repository/artist.repository';
import { AlbumRepository } from '../album/repository/album.repository';
import { TrackRepository } from '../track/repository/track.repository';

@Module({
  controllers: [FavoriteController],
  providers: [
    FavoriteService,
    FavoriteRepository,
    ArtistRepository,
    AlbumRepository,
    TrackRepository,
  ],
})
export class FavoriteModule {}
