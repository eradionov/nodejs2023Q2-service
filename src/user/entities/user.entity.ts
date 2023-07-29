import { v4 as uuidv4 } from 'uuid';
import { Exclude, Expose } from 'class-transformer';
import { UpdateUserDto } from '../dto/update-user.dto';

export class User {
  @Expose({ name: 'id' })
  private _id: string;

  @Expose({ name: 'login' })
  private _login: string;

  @Exclude()
  private _password: string;

  @Expose({ name: 'version' })
  private _version: number;

  @Expose({ name: 'createdAt' })
  private _createdAt: number;

  @Expose({ name: 'updatedAt' })
  private _updatedAt: number;

  private constructor(login: string, password: string) {
    this._id = uuidv4();
    this._version = 1;
    this._createdAt = new Date().getTime();
    this._updatedAt = new Date().getTime();
    this._login = login;
    this._password = password;
  }

  update(dto: UpdateUserDto) {
    this._version++;
    this._password = dto.newPassword;
    this._updatedAt = new Date().getTime();

    return this;
  }

  get id(): string {
    return this._id;
  }

  get login(): string {
    return this._login;
  }

  get password(): string {
    return this._password;
  }

  get version(): number {
    return this._version;
  }

  get createdAt(): number {
    return this._createdAt;
  }

  get updatedAt(): number {
    return this._updatedAt;
  }

  static create(login: string, password: string) {
    return new User(login, password);
  }
}
