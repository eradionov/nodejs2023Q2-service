import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AccessDeniedException } from '../exception/access_denied';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResponse } from './dto/user-response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let user = await this.userRepository.findOneBy({
      login: createUserDto.login,
    });

    if (null !== user) {
      return user;
    }

    user = await this.userRepository.save(
      User.create(createUserDto.login, createUserDto.password),
    );

    return new UserResponse(
      user.id,
      user.login,
      user.version,
      user.createdAt.getTime(),
      user.updatedAt?.getTime(),
    );
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: string) {
    return await this.userRepository.findOneByOrFail({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let user = await this.userRepository.findOneByOrFail({ id });

    if (user.password !== updateUserDto.oldPassword) {
      throw new AccessDeniedException();
    }

    user.update(updateUserDto);

    user = await this.userRepository.save(user);

    return new UserResponse(
      user.id,
      user.login,
      user.version,
      user.createdAt.getTime(),
      user.updatedAt?.getTime(),
    );
  }

  async remove(id: string) {
    await this.userRepository.remove(
      await this.userRepository.findOneByOrFail({ id }),
    );
  }
}
