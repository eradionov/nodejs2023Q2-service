import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {MinLength} from "class-validator";

export class UpdateUserDto {
    public readonly oldPassword: string;

    @MinLength(4)
    public readonly newPassword: string;
}
