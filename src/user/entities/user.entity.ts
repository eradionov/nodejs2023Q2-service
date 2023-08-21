import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Expose({ name: 'id' })
  @ApiProperty({ name: 'id' })
  id: string;

  @Column({ unique: true })
  @Expose({ name: 'login' })
  @ApiProperty({ name: 'login' })
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Exclude()
  @Column('varchar', { nullable: true, default: null, length: 512 })
  refreshToken: string | null;

  @VersionColumn()
  @Expose({ name: 'version' })
  @ApiProperty({ name: 'version' })
  version: number;

  @Expose({ name: 'createdAt' })
  @ApiProperty({ name: 'createdAt' })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Expose({ name: 'updatedAt' })
  @ApiProperty({ name: 'updatedAt' })
  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  private constructor(login: string, password: string) {
    this.login = login;
    this.password = password;
  }

  update(password: string) {
    this.password = password;

    return this;
  }

  static create(login: string, password: string) {
    return new User(login, password);
  }
}
