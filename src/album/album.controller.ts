import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  Put,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException, UseGuards,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AccessDeniedException } from '../exception/access_denied';
import { Album } from './entities/album.entity';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EntityNotFoundError } from 'typeorm';
import {JwtAuthenticationGuard} from "../auth/guard/jwt-authentication.guard";

@Controller('album')
@ApiTags('Album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Album,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    try {
      return await this.albumService.create(createAlbumDto);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
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
    type: Album,
    isArray: true,
  })
  async findAll() {
    return await this.albumService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Created',
    type: Album,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.albumService.findOne(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: CreateAlbumDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      return await this.albumService.update(id, updateAlbumDto);
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
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.albumService.remove(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
