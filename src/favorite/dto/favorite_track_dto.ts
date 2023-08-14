export class FavoriteTrackDto {
  constructor(
    public readonly id: string,
    public readonly duration: number,
    public readonly name: string,
    public readonly albumId: string | null = null,
    public readonly artistId: string | null = null,
  ) {}
}
