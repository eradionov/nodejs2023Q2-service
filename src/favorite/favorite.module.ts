import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Favorite } from './entities/favorite.entity';
import { Track } from '../track/entities/track.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, Album, Artist, Track])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
