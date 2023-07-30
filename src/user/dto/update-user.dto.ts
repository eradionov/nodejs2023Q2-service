import { MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  public readonly oldPassword: string;

  @MinLength(4)
  @ApiProperty()
  public readonly newPassword: string;
}
