import {
  Body, ClassSerializerInterceptor,
  Controller,
  Delete, ForbiddenException,
  Get, HttpCode, HttpException,
  HttpStatus, NotAcceptableException, NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post, Put,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import {UserService} from './user.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {EntityExistsException} from '../exception/entity_exists';
import {Response} from "express";
import {EntityNotExistsException} from "../exception/entity_not_exists";
import {AccessDeniedException} from "../exception/access_denied";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createUserDto: CreateUserDto, @Res({passthrough: true}) res: Response) {
    try {
      return this.userService.create(createUserDto);
    } catch (error) {
      let message = '';
      let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      if (error instanceof EntityExistsException) {
        message = error.message;
        statusCode = HttpStatus.BAD_REQUEST;
      }

      res.status(statusCode).send(message);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.userService.findOne(id);

    if (undefined === user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return this.userService.update(id, updateUserDto);
    } catch (error) {
      if (error instanceof EntityNotExistsException) {
        throw new NotFoundException();
      }

      if (error instanceof AccessDeniedException) {
        throw new ForbiddenException();
      }

      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.userService.remove(id);
    } catch (error) {
      if (error instanceof EntityNotExistsException) {
        throw new NotFoundException();
      }

      throw error;
    }
  }
}
