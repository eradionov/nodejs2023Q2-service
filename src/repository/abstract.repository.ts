import { User } from '../user/entities/user.entity';
import { EntityNotExistsException } from '../exception/entity_not_exists';
import {Artist} from "../artist/entities/artist.entity";

export abstract class AbstractRepository<T> {
  protected users: Array<User>;
  protected artists: Array<Artist>;
  constructor() {
    this.users = new Array<User>();
    this.artists = new Array<Artist>();
  }

  abstract save(entity: T);

  abstract remove(id: string);

  abstract findOneByName(name: string): T | undefined;

  abstract findOneById(id: string): T | undefined;

  abstract findAll(): T[];
}
