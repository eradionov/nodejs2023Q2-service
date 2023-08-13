import { Injectable } from '@nestjs/common';
import { FavoriteRepository } from './repository/favorite.repository';
import { TrackRepository } from '../track/repository/track.repository';
import { EntityNotExistsException } from '../exception/entity_not_exists';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Response } from './dto/response';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    // private readonly artistRepository: ArtistRepository,
    // private readonly albumRepository: AlbumRepository,
    private readonly trackRepository: TrackRepository,
  ) {}
  findAll(): Response {
    const favorits = this.favoriteRepository.findAll();

    const artists = favorits.map((favorite) => favorite?.artist);
    const albums = favorits.map((favorite) => favorite?.album);
    const tracks = favorits.map((favorite) => favorite?.track);

    return new Response(
      artists.filter((item) => item !== null && item !== undefined),
      albums.filter((item) => item !== null && item !== undefined),
      tracks.filter((item) => item !== null && item !== undefined),
    );
  }

  create(id: string, classType: string) {
    switch (classType) {
      case Album.name:
        const album = undefined; //this.albumRepository.findO(id);
        if (undefined === album) {
          throw new EntityNotExistsException(id);
        }

        return this.favoriteRepository.save(album);
      case Track.name:
        const track = this.trackRepository.findOneById(id);
        if (undefined === track) {
          throw new EntityNotExistsException(id);
        }

        return this.favoriteRepository.save(track);
      case Artist.name:
        // const artist = this.artistRepository.findOneById(id);
        // if (undefined === artist) {
        throw new EntityNotExistsException(id);
        // }
        return null;
      //return this.favoriteRepository.save(artist);
      default:
        throw new EntityNotExistsException(id);
    }
  }

  remove(id: string, classType: string) {
    this.favoriteRepository.remove(id, classType);
  }
}
