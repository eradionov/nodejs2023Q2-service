import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import {AlbumRepository} from "./repository/album.repository";
import {ArtistRepository} from "../artist/repository/artist.repository";

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository, ArtistRepository]
})
export class AlbumModule {}
