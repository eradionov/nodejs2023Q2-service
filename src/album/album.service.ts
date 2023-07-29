import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {AlbumRepository} from "./repository/album.repository";
import {ArtistRepository} from "../artist/repository/artist.repository";
import {EntityNotExistsException} from "../exception/entity_not_exists";
import {User} from "../user/entities/user.entity";
import {Album} from "./entities/album.entity";
import {AccessDeniedException} from "../exception/access_denied";

@Injectable()
export class AlbumService {
  constructor(
      private readonly albumRepository: AlbumRepository,
      private readonly artistRepository: ArtistRepository,
  ) {
  }
  create(createAlbumDto: CreateAlbumDto) {
    const artist = this.artistRepository.findOneById(createAlbumDto.artistId);

    if (
        null !== createAlbumDto.artistId
        && undefined === this.artistRepository.findOneById(createAlbumDto.artistId)
    ) {
      throw new EntityNotExistsException(createAlbumDto.artistId);
    }

    const album = Album.create(createAlbumDto.name, createAlbumDto.year, createAlbumDto.artistId);

    this.albumRepository.save(album);

    return album;
  }

  findAll() {
    return this.albumRepository.findAll();
  }

  findOne(id: string) {
    return this.albumRepository.findOneById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.albumRepository.findOneById(id);

    if (undefined === album) {
      throw new EntityNotExistsException(id);
    }

    if (
        null !== updateAlbumDto.artistId
        && undefined === this.artistRepository.findOneById(updateAlbumDto.artistId)
    ) {
      throw new EntityNotExistsException(updateAlbumDto.artistId);
    }

    return album.update(updateAlbumDto);
  }

  remove(id: string) {
    this.albumRepository.remove(id);
  }
}
