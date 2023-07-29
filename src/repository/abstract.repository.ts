import { User } from '../user/entities/user.entity';
import { EntityNotExistsException } from '../exception/entity_not_exists';
import {Artist} from "../artist/entities/artist.entity";
import {Album} from "../album/entities/album.entity";

export abstract class AbstractRepository<T> {
  protected static users = new Array<User>();
  protected static artists = new Array<Artist>();
  protected static albums = new Array<Album>();

  abstract save(entity: T);

  abstract remove(id: string);

  abstract findOneByName(name: string): T | undefined;

  abstract findOneById(id: string): T | undefined;

  abstract findAll(): T[];
}
