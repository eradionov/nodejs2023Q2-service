import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from '../artist/entities/artist.entity';
import { AlbumResponse } from './dto/album-response';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}
  async create(createAlbumDto: CreateAlbumDto) {
    let artist = null;

    if (
      null !== createAlbumDto?.artistId &&
      undefined !== createAlbumDto?.artistId
    ) {
      artist = await this.artistRepository.findOneByOrFail({
        id: createAlbumDto.artistId,
      });
    }

    const album = await this.albumRepository.save(
      Album.create(createAlbumDto.name, createAlbumDto.year, artist),
    );

    return new AlbumResponse(
      album.id,
      album.name,
      album.year,
      album?.artist?.id,
    );
  }

  async findAll() {
    return (
      await this.albumRepository.find({ relations: { artist: true } })
    ).map(
      (album) =>
        new AlbumResponse(album.id, album.name, album.year, album?.artist?.id),
    );
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOne({
      where: { id: id },
      relations: { artist: true },
    });

    if (null === album) {
      throw new EntityNotFoundError(Album, id);
    }

    return new AlbumResponse(
      album.id,
      album.name,
      album.year,
      album?.artist?.id,
    );
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOneByOrFail({ id: id });
    let artist = null;

    if (null === updateAlbumDto.artistId) {
      album.update(updateAlbumDto);
    } else {
      artist = await this.artistRepository.findOneByOrFail({
        id: updateAlbumDto.artistId,
      });
      album.update(updateAlbumDto, artist);
    }

    const updatedAlbum = await this.albumRepository.save(album);

    return new AlbumResponse(
      updatedAlbum.id,
      updatedAlbum.name,
      updatedAlbum.year,
      updatedAlbum?.artist?.id,
    );
  }

  async remove(id: string) {
    const album = await this.albumRepository.findOne({
      where: { id },
      relations: { artist: true },
    });

    if (null == album) {
      throw new EntityNotFoundError(Album, id);
    }

    await this.albumRepository.remove(album);
  }
}
