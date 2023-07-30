import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from './repository/artist.repository';
import { Artist } from './entities/artist.entity';
import { EntityNotExistsException } from '../exception/entity_not_exists';
import { AccessDeniedException } from '../exception/access_denied';
import { AlbumRepository } from '../album/repository/album.repository';
import { TrackRepository } from '../track/repository/track.repository';
import { UpdateTrackDto } from '../track/dto/update-track.dto';
import { UpdateAlbumDto } from '../album/dto/update-album.dto';
import { FavoriteRepository } from '../favorite/repository/favorite.repository';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly albumRepository: AlbumRepository,
    private readonly trackRepository: TrackRepository,
    private readonly favoritsRepository: FavoriteRepository,
  ) {}
  create(createArtistDto: CreateArtistDto): Artist {
    const artist = Artist.create(createArtistDto.name, createArtistDto.grammy);

    this.artistRepository.save(artist);

    return artist;
  }

  findAll() {
    return this.artistRepository.findAll();
  }

  findOne(id: string) {
    return this.artistRepository.findOneById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.artistRepository.findOneById(id);

    if (undefined === artist) {
      throw new EntityNotExistsException(id);
    }

    if (artist.name !== updateArtistDto.name) {
      throw new AccessDeniedException();
    }

    return artist.update(updateArtistDto);
  }

  remove(id: string) {
    this.favoritsRepository.remove(id, Artist.name);
    this.albumRepository.updateWhere(
      { artistId: id } as UpdateAlbumDto,
      { artistId: null } as UpdateAlbumDto,
    );
    this.trackRepository.updateWhere(
      { artistId: id } as UpdateTrackDto,
      { artistId: null } as UpdateTrackDto,
    );
    this.artistRepository.remove(id);
  }
}
