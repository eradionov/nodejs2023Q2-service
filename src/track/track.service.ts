import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackRepository } from './repository/track.repository';
import { EntityNotExistsException } from '../exception/entity_not_exists';
import { Track } from './entities/track.entity';
import { FavoriteRepository } from '../favorite/repository/favorite.repository';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepository: TrackRepository,
    // private readonly albumRepository: AlbumRepository,
    private readonly favoritsRepository: FavoriteRepository,
  ) {}
  create(createTrackDto: CreateTrackDto) {
    const trackQuery: Record<string, any> = {};

    if (null !== createTrackDto.albumId) {
      trackQuery.id = createTrackDto.albumId;
    }

    if (null !== createTrackDto.artistId) {
      trackQuery.artistId = createTrackDto.artistId;
    }

    if (
      null !== createTrackDto.albumId //&&
      //undefined === this.albumRepository.findBy(trackQuery)
    ) {
      throw new EntityNotExistsException(createTrackDto.albumId);
    }

    const track = Track.create(
      createTrackDto.name,
      createTrackDto.duration,
      createTrackDto.artistId,
      createTrackDto.albumId,
    );

    this.trackRepository.save(track);

    return track;
  }

  findAll() {
    return this.trackRepository.findAll();
  }

  findOne(id: string) {
    return this.trackRepository.findOneById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.trackRepository.findOneById(id);
    const trackQuery: Record<string, any> = {};

    if (undefined === track) {
      throw new EntityNotExistsException(id);
    }

    if (null !== updateTrackDto.albumId) {
      trackQuery.id = updateTrackDto.albumId;
    }

    if (null !== updateTrackDto.artistId) {
      trackQuery.artistId = updateTrackDto.artistId;
    }

    if (
      null !== updateTrackDto.albumId //&&
      // undefined === this.albumRepository.findBy(trackQuery)
    ) {
      throw new EntityNotExistsException(updateTrackDto.artistId);
    }

    return track.update(updateTrackDto);
  }

  remove(id: string) {
    this.favoritsRepository.remove(id, Track.name);
    this.trackRepository.remove(id);
  }
}
