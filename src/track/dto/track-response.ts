export class TrackResponse {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly duration: number,
    public readonly artistId: string | null = null,
    public readonly albumId: string | null = null,
  ) {}
}
