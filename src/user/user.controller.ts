import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AccessDeniedException } from '../exception/access_denied';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { EntityNotFoundError } from 'typeorm';
import { EntityExistsException } from '../exception/entity_exists';
import { JwtAuthenticationGuard } from '../auth/guard/jwt-authentication.guard';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: User,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.create(createUserDto);
    } catch (error) {
      if (error instanceof EntityExistsException) {
        throw new BadRequestException(error);
      }

      throw new InternalServerErrorException(error);
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
    isArray: true,
  })
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }

      if (error instanceof AccessDeniedException) {
        throw new ForbiddenException();
      }

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: User,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }

      if (error instanceof AccessDeniedException) {
        throw new ForbiddenException();
      }

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.userService.remove(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
