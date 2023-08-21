import { Injectable } from '@nestjs/common';
import { EntityNotExistsException } from '../exception/entity_not_exists';
import { Album } from '../album/entities/album.entity';
import { Track } from '../track/entities/track.entity';
import { Artist } from '../artist/entities/artist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavoriteTrack } from './entities/favorite_track.entity';
import { FavoriteArtist } from './entities/favorite_artist.entity';
import { FavoriteAlbum } from './entities/favorite_album.entity';
import { FavoriteArtistDto } from './dto/favorite_artist_dto';
import { FavoriteAlbumDto } from './dto/favorite_album_dto';
import { FavoriteTrackDto } from './dto/favorite_track_dto';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteTrack)
    private readonly favoriteTrackRepository: Repository<FavoriteTrack>,
    @InjectRepository(FavoriteArtist)
    private readonly favoriteArtistRepository: Repository<FavoriteArtist>,
    @InjectRepository(FavoriteAlbum)
    private readonly favoriteAlbumRepository: Repository<FavoriteAlbum>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}
  async findAll(): Promise<{
    albums: FavoriteAlbumDto[];
    artists: FavoriteArtistDto[];
    tracks: FavoriteTrackDto[];
  }> {
    const artists = await this.favoriteArtistRepository.find({
      relations: { artist: true },
    });

    const tracks = await this.favoriteTrackRepository.find({
      relations: { track: true },
    });

    const albums = await this.favoriteAlbumRepository.find({
      relations: { album: true },
    });

    const favArtists = artists.map(
      (favArtist) =>
        new FavoriteArtistDto(
          favArtist.artist.id,
          favArtist.artist.name,
          favArtist.artist.grammy,
        ),
    );

    const favAlbums = albums.map(
      (favAlbum) =>
        new FavoriteAlbumDto(
          favAlbum.album.id,
          favAlbum.album.name,
          favAlbum.album.year,
          favAlbum.album?.artist?.id,
        ),
    );

    const favTracks = tracks.map(
      (favTrack) =>
        new FavoriteTrackDto(
          favTrack.track.id,
          favTrack.track.duration,
          favTrack.track.name,
          favTrack.track.album?.id,
        ),
    );

    return {
      artists: favArtists,
      albums: favAlbums,
      tracks: favTracks,
    };
  }

  async create(id: string, classType: string) {
    switch (classType) {
      case Album.name:
        await this.favoriteAlbumRepository.save(
          new FavoriteAlbum(await this.albumRepository.findOneByOrFail({ id })),
        );

        break;
      case Track.name:
        await this.favoriteTrackRepository.save(
          new FavoriteTrack(await this.trackRepository.findOneByOrFail({ id })),
        );

        break;
      case Artist.name:
        await this.favoriteArtistRepository.save(
          new FavoriteArtist(
            await this.artistRepository.findOneByOrFail({ id }),
          ),
        );
        break;
      default:
        throw new EntityNotExistsException(id);
    }
  }

  async remove(id: string, classType: string) {
    switch (classType) {
      case Album.name:
        const album = await this.albumRepository.findOneByOrFail({ id });

        await this.favoriteAlbumRepository.delete({ album: { id: album.id } });
        break;
      case Track.name:
        const track = await this.trackRepository.findOneByOrFail({ id });

        await this.favoriteTrackRepository.delete({
          track: { id: track.id },
        });
        break;
      case Artist.name:
        const artist = await this.artistRepository.findOneByOrFail({ id });

        await this.favoriteArtistRepository.delete({
          artist: { id: artist.id },
        });
        break;
      default:
        throw new EntityNotExistsException(id);
    }
  }
}
