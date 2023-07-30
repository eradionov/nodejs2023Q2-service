import { AbstractRepository } from '../../repository/abstract.repository';
import { Injectable } from '@nestjs/common';
import { EntityNotExistsException } from '../../exception/entity_not_exists';
import { Track } from '../entities/track.entity';
import { UpdateTrackDto } from '../dto/update-track.dto';

@Injectable()
export class TrackRepository extends AbstractRepository<Track> {
  public findOneByName(name: string): Track | undefined {
    return <Track | undefined>(
      AbstractRepository.tracks.find((track) => track.name === name)
    );
  }

  public findOneById(id: string): Track | undefined {
    return <Track | undefined>(
      AbstractRepository.tracks.find((track) => track.id === id)
    );
  }

  public findAll(): Track[] {
    return AbstractRepository.tracks;
  }

  save(entity: object | Track) {
    if (entity instanceof Track) {
      return AbstractRepository.tracks.push(<Track>entity);
    }

    throw new Error('Invalid repository entity');
  }

  remove(id: string) {
    const userIndex = AbstractRepository.tracks.findIndex(
      (track) => track.id === id,
    );

    if (userIndex === -1) {
      throw new EntityNotExistsException(id);
    }

    AbstractRepository.tracks = AbstractRepository.tracks.filter(
      (track) => track.id !== id,
    );
  }

  updateWhere(where: UpdateTrackDto, updateWith: UpdateTrackDto) {
    AbstractRepository.tracks.forEach((track, index) => {
      let allMatch = undefined;

      for (const key of Object.keys(where)) {
        if (
          (allMatch === undefined || allMatch === true) &&
          AbstractRepository.tracks[index][key] === where[key]
        ) {
          allMatch = true;
        }
      }

      if (allMatch) {
        AbstractRepository.tracks[index].update(updateWith);
      }
    });
  }
}
