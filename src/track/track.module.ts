import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackRepository } from './repository/track.repository';
import { FavoriteRepository } from '../favorite/repository/favorite.repository';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackRepository, FavoriteRepository],
})
export class TrackModule {}
