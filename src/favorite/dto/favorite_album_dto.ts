export class FavoriteAlbumDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly year: number,
    public readonly artistId: string,
  ) {}
}
