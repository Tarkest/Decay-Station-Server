import {getCustomRepository} from "typeorm";
import {UserRepository} from '../../repositories/user';
import {getItems} from './utils';
import {splitBuildings} from "../../sharedUtilities";

const getBuildings = train => ({
    ...train, ...splitBuildings(train.buildings),
});

export default class UserService {
    private repo = getCustomRepository(UserRepository);

    public async getAllUserInfo(id: number): Promise<any> {
        try {
            const user = await this.repo.oneWithDependencies(id);
            return {
                ...user,
                carriages: user.carriages
                    .map(getBuildings),
                locomotives: user.locomotives
                    .map(getBuildings),
            };
        } catch (e) {
            throw e;
        }
    }

    public async getAllInventories(id: number) {
        const {carriages, locomotives, characters} = await this.repo.userInventories(id);
        return {
            carriages: carriages.map(getItems),
            characters: characters.map(getItems),
            locomotives: locomotives.map(getItems),
        };
    }

    public async levelUp(userId) {
        const {id, level, accountExperience} = await this.repo.findOne({where: {id: userId}});
        const required = level === 1 ? 100 : Math.pow(2, level - 1) * 100;

        if (accountExperience >= required) {
            return this.repo.update({id}, {level: level + 1});
        } else {
            throw new Error('Not enough experience');
        }
    }
}
