import {User} from "../../database/models";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public oneWithDependencies(id) {
        return this.findOne({
            relations: [
                'currentZone',
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
                'characters.paramsExperience',
            ],
            where: {
                id,
            },
        });
    }

    public userInventories(id) {
        return this.findOne({
            relations: [
                'carriages',
                'carriages.items',
                'locomotives',
                'locomotives.items',
                'characters',
                'characters.items',
            ],
            select: ['id'],
            where: {
                id,
            },
        });
    }
}
