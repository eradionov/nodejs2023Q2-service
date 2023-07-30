import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityExistsException } from '../exception/entity_exists';
import { User } from './entities/user.entity';
import { EntityNotExistsException } from '../exception/entity_not_exists';
import { AccessDeniedException } from '../exception/access_denied';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    if (undefined !== this.userRepository.findOneByName(createUserDto.login)) {
      throw new EntityExistsException(createUserDto.login);
    }

    const user = User.create(createUserDto.login, createUserDto.password);

    this.userRepository.save(user);

    return user;
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: string) {
    return this.userRepository.findOneById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.userRepository.findOneById(id);

    if (undefined === user) {
      throw new EntityNotExistsException(id);
    }

    if (user.password !== updateUserDto.oldPassword) {
      throw new AccessDeniedException();
    }

    return user.update(updateUserDto);
  }

  remove(id: string) {
    this.userRepository.remove(id);
  }
}
