import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {ArtistRepository} from "./repository/artist.repository";
import {EntityExistsException} from "../exception/entity_exists";
import {User} from "../user/entities/user.entity";
import {Artist} from "./entities/artist.entity";
import {EntityNotExistsException} from "../exception/entity_not_exists";
import {AccessDeniedException} from "../exception/access_denied";

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {
  }
  create(createArtistDto: CreateArtistDto): Artist {
    const artist = Artist.create(createArtistDto.name, createArtistDto.grammy);

    this.artistRepository.save(artist);

    return artist;
  }

  findAll() {
    return this.artistRepository.findAll();
  }

  findOne(id: string) {
    return this.artistRepository.findOneById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = this.artistRepository.findOneById(id);

    if (undefined === artist) {
      throw new EntityNotExistsException(id);
    }

    if (artist.name !== updateArtistDto.name) {
      throw new AccessDeniedException();
    }

    return artist.update(updateArtistDto);
  }

  remove(id: string) {
    this.artistRepository.remove(id);
  }
}
