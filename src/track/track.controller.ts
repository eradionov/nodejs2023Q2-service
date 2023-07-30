import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { EntityNotExistsException } from '../exception/entity_not_exists';
import { AccessDeniedException } from '../exception/access_denied';
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
  UseInterceptors,
} from '@nestjs/common';
import { EntityExistsException } from '../exception/entity_exists';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Track } from './entities/track.entity';

@Controller('track')
@ApiTags('Track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Track,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
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
  @ApiResponse({
    status: HttpStatus.OK,
    type: Track,
    isArray: true,
  })
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Track,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
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
  @ApiBody({
    type: CreateTrackDto,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Track,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
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
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
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
