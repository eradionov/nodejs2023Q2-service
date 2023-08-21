import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AccessDeniedException } from '../exception/access_denied';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResponse } from './dto/user-response';
import { compare, hash } from 'bcrypt';

@Injectable()
export class UserService {
  static readonly SALT_OR_ROUNDS: number = 8;

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
      User.create(
        createUserDto.login,
        await hash(createUserDto.password, UserService.SALT_OR_ROUNDS),
      ),
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

  async findOneByLogin(login: string) {
    return await this.userRepository.findOneBy({ login });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    let user = await this.userRepository.findOneByOrFail({ id });

    if (!(await compare(updateUserDto.oldPassword, user.password))) {
      throw new AccessDeniedException();
    }

    user = user.update(
      await hash(updateUserDto.newPassword, UserService.SALT_OR_ROUNDS),
    );

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

  async refreshToken(id: string, refreshToken: string): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });

    if (null === user) {
      return null;
    }

    user.refreshToken = refreshToken;

    await this.userRepository.save(user);

    return user;
  }
}
