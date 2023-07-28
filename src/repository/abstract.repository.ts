import {User} from "../user/entities/user.entity";
import {EntityNotExistsException} from "../exception/entity_not_exists";

export abstract class AbstractRepository {
    protected users: Array<User>;
    constructor() {
        this.users = new Array<User>();
    }

    abstract save(entity: object);

    abstract remove(id: string);
}