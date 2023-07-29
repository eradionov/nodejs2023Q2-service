import {AbstractRepository} from "../../repository/abstract.repository";
import {Injectable} from "@nestjs/common";
import {User} from "../../user/entities/user.entity";
import {EntityNotExistsException} from "../../exception/entity_not_exists";
import {Track} from "../entities/track.entity";

@Injectable()
export class TrackRepository extends AbstractRepository<Track> {
    public findOneByName(name: string): Track | undefined {
        return <Track | undefined>AbstractRepository.tracks.find((track) => track.name === name);
    }

    public findOneById(id: string): Track | undefined {
        return <Track | undefined>AbstractRepository.tracks.find((track) => track.id === id);
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
        const userIndex = AbstractRepository.tracks.findIndex((track) => track.id === id);

        if (userIndex === -1) {
            throw new EntityNotExistsException(id);
        }

        AbstractRepository.tracks = AbstractRepository.tracks.filter((track) => track.id !== id);
    }
}