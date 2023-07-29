export class EntityNotExistsException extends Error {
  constructor(part: string) {
    super(`${part} not exists`);
  }
}
