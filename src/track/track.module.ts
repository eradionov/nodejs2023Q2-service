import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import {TrackRepository} from "./repository/track.repository";
import {AlbumRepository} from "../album/repository/album.repository";

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackRepository, AlbumRepository]
})
export class TrackModule {}
