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
  BadRequestException,
  InternalServerErrorException,
  ParseUUIDPipe,
  NotFoundException,
  Put,
  ForbiddenException, UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { EntityExistsException } from '../exception/entity_exists';
import { AccessDeniedException } from '../exception/access_denied';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Artist } from './entities/artist.entity';
import { EntityNotFoundError } from 'typeorm';
import {JwtAuthenticationGuard} from "../auth/guard/jwt-authentication.guard";

@Controller('artist')
@ApiTags('Artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Artist,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async create(@Body() createArtistDto: CreateArtistDto) {
    try {
      return await this.artistService.create(createArtistDto);
    } catch (error) {
      if (error instanceof EntityExistsException) {
        throw new BadRequestException(error);
      }

      throw new InternalServerErrorException();
    }
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Artist,
    isArray: true,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async findAll() {
    return await this.artistService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: Artist,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return await this.artistService.findOne(id);
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
    type: CreateArtistDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    try {
      return await this.artistService.update(id, updateArtistDto);
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
      await this.artistService.remove(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }
}
