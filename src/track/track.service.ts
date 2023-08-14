import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { TrackResponse } from './dto/track-response';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}
  async create(createTrackDto: CreateTrackDto) {
    let album = null;
    let artist = null;

    let track = await this.trackRepository.findOne({
      where: { name: createTrackDto.name },
      relations: { artist: true, album: true },
    });

    if (null !== track) {
      return new TrackResponse(
        track.id,
        track.name,
        track.duration,
        track?.artist?.id,
        track?.album?.id,
      );
    }

    if (null !== createTrackDto?.albumId) {
      album = await this.albumRepository.findOneByOrFail({
        id: createTrackDto.albumId,
      });
    }

    if (null !== createTrackDto?.artistId) {
      artist = await this.artistRepository.findOneByOrFail({
        id: createTrackDto.artistId,
      });
    }

    track = Track.create(
      createTrackDto.name,
      createTrackDto.duration,
      artist,
      album,
    );

    const updatedTrack = await this.trackRepository.save(track);

    return new TrackResponse(
      updatedTrack.id,
      updatedTrack.name,
      updatedTrack.duration,
      updatedTrack?.artist?.id,
      updatedTrack?.album?.id,
    );
  }

  async findAll() {
    return (
      await this.trackRepository.find({
        relations: { artist: true, album: true },
      })
    ).map(
      (track) =>
        new TrackResponse(
          track.id,
          track.name,
          track.duration,
          track?.artist?.id,
          track?.album?.id,
        ),
    );
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOne({
      where: { id },
      relations: { artist: true, album: true },
    });

    if (null === track) {
      throw new EntityNotFoundError(Track, id);
    }

    return new TrackResponse(
      track.id,
      track.name,
      track.duration,
      track?.artist?.id,
      track?.album?.id,
    );
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.findOneByOrFail({ id });
    let album = null;
    let artist = null;

    if (null !== updateTrackDto.albumId) {
      album = await this.albumRepository.findOneByOrFail({
        id: updateTrackDto.albumId,
      });
    }

    if (null !== updateTrackDto.artistId) {
      artist = await this.artistRepository.findOneByOrFail({
        id: updateTrackDto.artistId,
      });
    }

    track.update(updateTrackDto.name, updateTrackDto.duration, artist, album);

    const updatedTrack = await this.trackRepository.save(track);

    return new TrackResponse(
      updatedTrack.id,
      updatedTrack.name,
      updatedTrack.duration,
      updatedTrack?.artist?.id,
      updatedTrack?.album?.id,
    );
  }

  async remove(id: string) {
    await this.trackRepository.remove(
      await this.trackRepository.findOneByOrFail({ id }),
    );
  }
}
