import { AbstractRepository } from '../../repository/abstract.repository';
import { Injectable } from '@nestjs/common';
import { EntityNotExistsException } from '../../exception/entity_not_exists';
import { Album } from '../entities/album.entity';
import { UpdateAlbumDto } from '../dto/update-album.dto';

@Injectable()
export class AlbumRepository extends AbstractRepository<Album> {
  findOneByName(name: string): Album | undefined {
    return <Album | undefined>(
      AbstractRepository.albums.find((album) => album.name === name)
    );
  }

  findOneById(id: string): Album | undefined {
    return <Album | undefined>(
      AbstractRepository.albums.find((album) => album.id === id)
    );
  }

  findBy(query: Record<string, any>): Album[] {
    if (undefined === query?.id && undefined === query?.artistId) {
      return [];
    }

    return <Album[]>AbstractRepository.albums.filter((album) => {
      let isMatch = null;

      if (undefined !== query?.id) {
        isMatch = album.id === query.id;
      }

      if (undefined !== query?.artistId) {
        isMatch =
          (isMatch === null || isMatch === true) &&
          album.artistId === query.artistId;
      }

      return !!isMatch;
    });
  }

  findAll(): Album[] {
    return AbstractRepository.albums;
  }

  save(entity: object | Album) {
    if (entity instanceof Album) {
      return AbstractRepository.albums.push(<Album>entity);
    }

    throw new Error('Invalid repository entity');
  }

  remove(id: string) {
    const albumIndex = AbstractRepository.albums.findIndex(
      (album) => album.id === id,
    );

    if (albumIndex === -1) {
      throw new EntityNotExistsException(id);
    }

    AbstractRepository.albums = AbstractRepository.albums.filter(
      (album) => album.id !== id,
    );
  }

  updateWhere(where: UpdateAlbumDto, updateWith: UpdateAlbumDto) {
    AbstractRepository.albums.forEach((track, index) => {
      let allMatch = undefined;

      for (const key of Object.keys(where)) {
        if (
          (allMatch === undefined || allMatch === true) &&
          AbstractRepository.albums[index][key] === where[key]
        ) {
          allMatch = true;
        }
      }

      if (allMatch) {
        AbstractRepository.albums[index].update(updateWith);
      }
    });
  }
}
