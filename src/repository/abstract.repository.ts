import { User } from '../user/entities/user.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { Favorite } from '../favorite/entities/favorite.entity';

export abstract class AbstractRepository<T> {
  protected static users = new Array<User>();
  protected static artists = new Array<Artist>();
  protected static albums = new Array<Album>();
  protected static tracks = new Array<Track>();
  protected static favorits = new Array<Favorite>();

  abstract save(entity: T);

  abstract remove(id: string, type: string | undefined);

  abstract findOneByName(name: string): T | undefined;

  abstract findOneById(id: string): T | undefined;

  abstract findAll(): T[];
}
