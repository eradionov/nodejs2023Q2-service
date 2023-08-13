import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { FavoriteRepository } from './repository/favorite.repository';
import { TrackRepository } from '../track/repository/track.repository';

@Module({
  controllers: [FavoriteController],
  providers: [
    FavoriteService,
    FavoriteRepository,
    TrackRepository,
  ],
})
export class FavoriteModule {}
