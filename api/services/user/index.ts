import {getCustomRepository} from "typeorm";
import {User} from "../../../database/models";
import {UserRepository} from '../../repositories/user'

export default class UserService {
    private repo = getCustomRepository(UserRepository);

    async getUser(id: number): Promise<any> {
        try {
            return await this.repo.oneWithTrain(id);
        } catch (e) {
            console.log(e);
        }
    }
}