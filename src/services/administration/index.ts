import { getRepository, Repository } from "typeorm";
import Administrator from "../../../database/models/administration";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import * as config from "../../../config.json";

export default class AdministratorService {
    private AdministratorRepository: Repository<Administrator> = getRepository(Administrator);

    public async checkUser(login: string, password: string): Promise<string> {
        const user: Administrator = (await this.AdministratorRepository.find({ login })).shift();

        if(user) {
            if(compareSync(password, user.password)) {
                const token = sign({ adminId: user.id }, config.jwtSecret);
                return token;
            }
        }
        throw new Error('Wrong credentials');
    }
}