import { Injectable } from '@nestjs/common';
import { EntityNotExistsException } from '../exception/entity_not_exists';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';
import { FavouriteResponse } from './dto/favourite_response';
import { Repository } from 'typeorm';
import { Favorite } from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumResponse } from '../album/dto/album-response';
import { TrackResponse } from '../track/dto/track-response';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
  ) {}
  async findAll() {
    const favorits = await this.favoriteRepository.find({
      relations: { track: true, album: true, artist: true },
    });

    let artists = favorits.map((favorite) => favorite?.artist);
    let albums = favorits.map((favorite) => favorite?.album);
    let tracks = favorits.map((favorite) => favorite?.track);

    artists = artists.filter((artist) => artist);
    albums = albums.filter((album) => album);
    tracks = tracks.filter((track) => track);

    return new FavouriteResponse(
      artists,
      albums.map(
        (album) =>
          new AlbumResponse(
            album.id,
            album.name,
            album.year,
            album?.artist?.id,
          ),
      ),
      tracks.map(
        (track) =>
          new TrackResponse(
            track.id,
            track.name,
            track.duration,
            track?.artist?.id,
            track?.album?.id,
          ),
      ),
    );
  }

  async create(id: string, classType: string) {
    const result = await this.findOneOfEntity(id, classType);

    switch (classType) {
      case Album.name:
        await this.favoriteRepository.save(new Favorite(null, <Album>result));

        return;
      case Track.name:
        await this.favoriteRepository.save(
          new Favorite(null, null, <Track>result),
        );
      case Artist.name:
        await this.favoriteRepository.save(new Favorite(<Artist>result));
      default:
        throw new EntityNotExistsException(id);
    }
  }

  async remove(id: string, classType: string) {
    // await this.favoriteRepository.remove(
    //   await this.findOneOfEntity(id, classType),
    // );
  }

  private async findOneOfEntity(id: string, classType: string) {
    switch (classType) {
      case Album.name:
        return await this.albumRepository.findOneByOrFail({ id });
      case Track.name:
        return await this.trackRepository.findOneByOrFail({ id });
      case Artist.name:
        return await this.artistRepository.findOneByOrFail({ id });
      default:
        throw new EntityNotExistsException(id);
    }
  }
}
