import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './repository/artist.repository';
import { AlbumRepository } from '../album/repository/album.repository';
import { TrackRepository } from '../track/repository/track.repository';
import { FavoriteRepository } from '../favorite/repository/favorite.repository';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    ArtistRepository,
    AlbumRepository,
    TrackRepository,
    FavoriteRepository,
  ],
})
export class ArtistModule {}
