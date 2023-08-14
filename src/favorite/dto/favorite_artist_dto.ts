export class FavoriteArtistDto {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly grammy: boolean,
  ) {}
}
