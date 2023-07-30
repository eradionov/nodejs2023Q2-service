import { MinLength } from 'class-validator';

export class UpdateUserDto {
  public readonly oldPassword: string;

  @MinLength(4)
  public readonly newPassword: string;
}
