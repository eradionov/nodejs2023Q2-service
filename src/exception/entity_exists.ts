export class EntityExistsException extends Error {
    constructor(part: string) {
        super(`${part} already exists`);
    }
}