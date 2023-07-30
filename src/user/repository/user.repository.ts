import { AbstractRepository } from '../../repository/abstract.repository';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { EntityNotExistsException } from '../../exception/entity_not_exists';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  findOneByName(login: string): User | undefined {
    return <User | undefined>(
      AbstractRepository.users.find((user) => user.login === login)
    );
  }

  findOneById(id: string): User | undefined {
    return <User | undefined>(
      AbstractRepository.users.find((user) => user.id === id)
    );
  }

  findAll(): User[] {
    return AbstractRepository.users;
  }

  save(entity: object | User) {
    if (entity instanceof User) {
      return AbstractRepository.users.push(<User>entity);
    }

    throw new Error('Invalid repository entity');
  }

  remove(id: string) {
    const userIndex = AbstractRepository.users.findIndex(
      (user) => user.id === id,
    );

    if (userIndex === -1) {
      throw new EntityNotExistsException(id);
    }

    AbstractRepository.users = AbstractRepository.users.filter(
      (user) => user.id !== id,
    );
  }
}
