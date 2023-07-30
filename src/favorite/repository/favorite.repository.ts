import { AbstractRepository } from '../../repository/abstract.repository';
import { Injectable } from '@nestjs/common';
import { Favorite } from '../entities/favorite.entity';
import { Track } from '../../track/entities/track.entity';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';

@Injectable()
export class FavoriteRepository extends AbstractRepository<Favorite> {
  findOneByName(name: string): Favorite | undefined {
    throw new Error('Not implemented');
  }

  findOneById(id: string): Favorite | undefined {
    throw new Error('Not implemented');
  }
  findAll(): Favorite[] {
    return AbstractRepository.favorits;
  }

  save(entity: object | Album | Track | Artist) {
    if (entity instanceof Album) {
      AbstractRepository.favorits.push(new Favorite(null, <Album>entity, null));

      return entity;
    }

    if (entity instanceof Track) {
      return AbstractRepository.favorits.push(
        new Favorite(null, null, <Track>entity),
      );

      return entity;
    }

    if (entity instanceof Artist) {
      return AbstractRepository.favorits.push(new Favorite(<Artist>entity));

      return entity;
    }

    throw new Error('Invalid repository entity');
  }

  remove(id: string, classType: string | undefined) {
    switch (classType) {
      case Artist.name:
        AbstractRepository.favorits = AbstractRepository.favorits.filter(
          (item) => item?.artist?.id !== id,
        );
        break;
      case Album.name:
        AbstractRepository.favorits = AbstractRepository.favorits.filter(
          (item) => item?.album?.id !== id,
        );
        break;
      case Track.name:
        AbstractRepository.favorits = AbstractRepository.favorits.filter(
          (item) => item?.track?.id !== id,
        );
        break;
      default:
        throw new Error('Invalid Repository search class');
    }
  }
}
