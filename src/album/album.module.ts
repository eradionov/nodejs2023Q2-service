import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './repository/album.repository';
import { ArtistRepository } from '../artist/repository/artist.repository';
import { TrackRepository } from '../track/repository/track.repository';
import { FavoriteRepository } from '../favorite/repository/favorite.repository';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    AlbumRepository,
    ArtistRepository,
    TrackRepository,
    FavoriteRepository,
  ],
})
export class AlbumModule {}
