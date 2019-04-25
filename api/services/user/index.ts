import {getCustomRepository} from "typeorm";
import {User} from "../../../database/models";
import {UserRepository} from '../../repositories/user'

export default class UserService {
    private repo = getCustomRepository(UserRepository);

    async getAlluserInfo(id: number): Promise<any> {
        try {
            return await this.repo.oneWithDependencies(id);
        } catch (e) {
            console.log(e);
        }
    }

    async getUser(id: number) {
        return this.repo.findOne(id)
    }
}