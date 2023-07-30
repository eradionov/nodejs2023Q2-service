import { AbstractRepository } from '../../repository/abstract.repository';
import { Injectable } from '@nestjs/common';
import { EntityNotExistsException } from '../../exception/entity_not_exists';
import { Artist } from '../entities/artist.entity';

@Injectable()
export class ArtistRepository extends AbstractRepository<Artist> {
  public findOneByName(name: string): Artist | undefined {
    return <Artist | undefined>(
      AbstractRepository.artists.find((artist) => artist.name === name)
    );
  }

  public findOneById(id: string): Artist | undefined {
    return <Artist | undefined>(
      AbstractRepository.artists.find((artist) => artist.id === id)
    );
  }

  public findAll(): Artist[] {
    return AbstractRepository.artists;
  }

  save(entity: object | Artist) {
    if (entity instanceof Artist) {
      return AbstractRepository.artists.push(<Artist>entity);
    }

    throw new Error('Invalid repository entity');
  }

  remove(id: string) {
    const userIndex = AbstractRepository.artists.findIndex(
      (user) => user.id === id,
    );

    if (userIndex === -1) {
      throw new EntityNotExistsException(id);
    }

    AbstractRepository.artists = AbstractRepository.artists.filter(
      (artist) => artist.id !== id,
    );
  }
}
