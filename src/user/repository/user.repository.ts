import {AbstractRepository} from "../../repository/abstract.repository";
import {Injectable} from "@nestjs/common";
import {User} from "../entities/user.entity";
import {EntityNotExistsException} from "../../exception/entity_not_exists";

@Injectable()
export class UserRepository extends AbstractRepository {
    findUserByName(login: string): User|undefined
    {
        return <User|undefined> this.users.find(user => user.login === login);
    }

    findUserById(id: string): User|undefined
    {
        return <User|undefined> this.users.find(user => user.id === id);
    }

    getAllUsers() {
        return this.users;
    }

    save(entity: object|User) {
        if (entity instanceof User) {
            return this.users.push(<User>entity);
        }

        throw new Error('Invalid repository entity');
    }

    remove(id: string) {
        const userIndex = this.users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            throw new EntityNotExistsException(id);
        }

        this.users = this.users.filter(user => user.id !== id);
    }
}