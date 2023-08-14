export class UserResponse {
  constructor(
    public readonly id: string,
    public readonly login: string,
    public version: number,
    public readonly createdAt: number,
    public readonly updatedAt?: number,
  ) {}
}
