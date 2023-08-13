import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { Favorite } from '../favorite/entities/favorite.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}
  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return await this.artistRepository.save(
      Artist.create(createArtistDto.name, createArtistDto.grammy),
    );
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    return await this.artistRepository.findOneByOrFail({ id: id });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOneByOrFail({ id: id });

    artist.update(updateArtistDto);

    return await this.artistRepository.save(artist);
  }

  async remove(id: string) {
    await this.artistRepository.remove(
      await this.artistRepository.findOneByOrFail({ id: id }),
    );
  }
}
