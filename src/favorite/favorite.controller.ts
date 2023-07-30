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
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { EntityNotExistsException } from '../exception/entity_not_exists';
import { Artist } from '../artist/entities/artist.entity';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from './dto/response';

@Controller('favs')
@ApiTags('Favorits')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Response,
    isArray: true,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.favoriteService.findAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Track,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Unprocessable.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  createTrack(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.favoriteService.create(id, Track.name);
    } catch (error) {
      if (error instanceof EntityNotExistsException) {
        throw new UnprocessableEntityException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Album,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Unprocessable.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  createAlbum(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.favoriteService.create(id, Album.name);
    } catch (error) {
      if (error instanceof EntityNotExistsException) {
        throw new UnprocessableEntityException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Artist,
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Unprocessable.',
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  createArtist(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.favoriteService.create(id, Artist.name);
    } catch (error) {
      if (error instanceof EntityNotExistsException) {
        throw new UnprocessableEntityException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.favoriteService.remove(id, Track.name);
    } catch (error) {
      if (error instanceof EntityNotExistsException) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  deleteAlbum(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.favoriteService.remove(id, Album.name);
    } catch (error) {
      if (error instanceof EntityNotExistsException) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  deleteArtist(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.favoriteService.remove(id, Artist.name);
    } catch (error) {
      if (error instanceof EntityNotExistsException) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
