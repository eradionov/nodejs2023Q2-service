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
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { EntityNotExistsException } from '../exception/entity_not_exists';
import { AccessDeniedException } from '../exception/access_denied';
import { EntityExistsException } from '../exception/entity_exists';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    try {
      return this.albumService.create(createAlbumDto);
    } catch (error) {
      if (error instanceof EntityExistsException) {
        throw new BadRequestException(error, error.message);
      }

      throw new InternalServerErrorException(error);
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const album = this.albumService.findOne(id);

    if (undefined === album) {
      throw new NotFoundException();
    }

    return album;
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    try {
      return this.albumService.update(id, updateAlbumDto);
    } catch (error) {
      if (error instanceof EntityNotExistsException) {
        throw new NotFoundException();
      }

      if (error instanceof AccessDeniedException) {
        throw new ForbiddenException();
      }

      throw new InternalServerErrorException();
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    try {
      this.albumService.remove(id);
    } catch (error) {
      if (error instanceof EntityNotExistsException) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
