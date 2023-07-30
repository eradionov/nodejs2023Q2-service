import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './repository/album.repository';
import { ArtistRepository } from '../artist/repository/artist.repository';
import { EntityNotExistsException } from '../exception/entity_not_exists';
import { Album } from './entities/album.entity';
import { UpdateTrackDto } from '../track/dto/update-track.dto';
import { FavoriteRepository } from '../favorite/repository/favorite.repository';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly artistRepository: ArtistRepository,
    private readonly trackRepository: TrackRepository,
    private readonly favoritsRepository: FavoriteRepository,
  ) {}
  create(createAlbumDto: CreateAlbumDto) {
    if (
      null !== createAlbumDto.artistId &&
      undefined === this.artistRepository.findOneById(createAlbumDto.artistId)
    ) {
      throw new EntityNotExistsException(createAlbumDto.artistId);
    }

    const album = Album.create(
      createAlbumDto.name,
      createAlbumDto.year,
      createAlbumDto.artistId,
    );

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
      null !== updateAlbumDto.artistId &&
      undefined === this.artistRepository.findOneById(updateAlbumDto.artistId)
    ) {
      throw new EntityNotExistsException(updateAlbumDto.artistId);
    }

    return album.update(updateAlbumDto);
  }

  remove(id: string) {
    this.favoritsRepository.remove(id, Album.name);
    this.trackRepository.updateWhere(
      { albumId: id } as UpdateTrackDto,
      { albumId: null } as UpdateTrackDto,
    );
    this.albumRepository.remove(id);
  }
}
