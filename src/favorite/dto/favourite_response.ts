import { FavoriteArtistDto } from './favorite_artist_dto';
import { FavoriteAlbumDto } from './favorite_album_dto';
import { FavoriteTrackDto } from './favorite_track_dto';

export interface FavoriteResponse {
  artists: FavoriteArtistDto[];
  albums: FavoriteAlbumDto[];
  tracks: FavoriteTrackDto[];
}
