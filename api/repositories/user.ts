import {User} from "../../database/models";
import {EntityRepository, getCustomRepository, Repository} from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    oneWithTrain(id) {
        return this.findOne(id, {
            relations: [
                'carriages',
                'carriages.buildings',
                'carriages.buildings.type',
                'locomotives',
                'locomotives.buildings',
                'locomotives.buildings.type',
            ]
        })
    }
}

