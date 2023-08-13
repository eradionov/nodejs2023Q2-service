import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TrackRepository } from '../track/repository/track.repository';
import { FavoriteRepository } from '../favorite/repository/favorite.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from './entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist, Album])],
  controllers: [AlbumController],
  providers: [AlbumService, TrackRepository, FavoriteRepository],
})
export class AlbumModule {}
