import {getCustomRepository} from "typeorm";
import {UserRepository} from '../../repositories/user'
import {getItems} from './utils'
import {splitBuildings} from "../../sharedUtilities";

export default class UserService {
    private repo = getCustomRepository(UserRepository);

    async getAllUserInfo(id: number): Promise<any> {
        try {
            const user = await this.repo.oneWithDependencies(id);
            return {
                ...user,
                carriages: user.carriages
                    .map(carriage => ({...carriage, ...splitBuildings(carriage.buildings)})),
                locomotives: user.locomotives
                    .map(carriage => ({...carriage, ...splitBuildings(carriage.buildings)}))
            }
        } catch (e) {
            throw e;
        }
    }

    async getAllInventories(id: number) {
        const {carriages, locomotives, characters} = await this.repo.userInventories(id);
        return {
            carriages: carriages.map(getItems),
            locomotives: locomotives.map(getItems),
            characters: characters.map(getItems)
        }
    }

    async levelUp(userId) {
        const {id, level, accountExperience} = await this.repo.findOne({where: {id: userId}});
        const required = level === 1 ? 100 : Math.pow(2, level - 1) * 100;

        if (accountExperience >= required) {
            return this.repo.update({id}, {level: level + 1})
        } else {
            throw new Error('Not enough experience')
        }
    }
}