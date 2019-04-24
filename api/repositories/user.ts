import {User} from "../../database/models";
import {EntityRepository, getCustomRepository, Repository, In} from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    oneWithTrain(id) {
        return this.find({
            relations: [
                'carriages',
                'locomotives',
            ],
        })
    }
}

