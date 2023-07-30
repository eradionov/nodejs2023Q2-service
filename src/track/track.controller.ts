import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { EntityNotExistsException } from '../exception/entity_not_exists';
import { AccessDeniedException } from '../exception/access_denied';
import {
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
  UseInterceptors,
} from '@nestjs/common';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createTrackDto: CreateTrackDto) {
    try {
      return this.trackService.create(createTrackDto);
    } catch (error) {
      if (error instanceof EntityExistsException) {
        throw new BadRequestException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const track = this.trackService.findOne(id);

    if (undefined === track) {
      throw new NotFoundException();
    }

    return track;
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    try {
      return this.trackService.update(id, updateTrackDto);
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
      this.trackService.remove(id);
    } catch (error) {
      if (error instanceof EntityNotExistsException) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
