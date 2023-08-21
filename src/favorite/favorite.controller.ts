import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
  InternalServerErrorException,
  UnprocessableEntityException, UseGuards,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { EntityNotExistsException } from '../exception/entity_not_exists';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { EntityNotFoundError } from 'typeorm';
import {JwtAuthenticationGuard} from "../auth/guard/jwt-authentication.guard";

@Controller('favs')
@ApiTags('Favorits')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    return await this.favoriteService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Unprocessable.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async createTrack(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favoriteService.create(id, Track.name);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new UnprocessableEntityException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Unprocessable.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favoriteService.create(id, Album.name);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new UnprocessableEntityException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Unprocessable.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async createArtist(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favoriteService.create(id, Artist.name);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new UnprocessableEntityException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favoriteService.remove(id, Track.name);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favoriteService.remove(id, Album.name);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    try {
      await this.favoriteService.remove(id, Artist.name);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
