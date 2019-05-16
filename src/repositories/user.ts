import {User} from "../../database/models";
import {EntityRepository, getCustomRepository, Repository, In} from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    oneWithDependencies(id) {
        return this.findOne({
            where: {
                id
            },
            relations: [
                'carriages',
                'carriages.type',
                'carriages.items',
                'carriages.buildings',
                'carriages.buildings.currentStamp',
                'locomotives',
                'locomotives.type',
                'locomotives.items',
                'locomotives.buildings',
                'locomotives.buildings.currentStamp',
                'characters',
                'characters.type',
                'characters.specialization',
                'characters.items',
            ],
        })
    }
}

