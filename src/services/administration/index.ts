import { getRepository } from "typeorm";
import Administrator from "../../../database/models/administration";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import * as config from "../../../config.json";

export default class AdministratorService {

  private administratorRepository = getRepository(Administrator);

  public async checkUser(login: string, password: string): Promise<string> {
    const user = await this.administratorRepository.findOne({ where: { login } });

    if(user) {
      if(compareSync(password, user.password)) {
        return sign({ adminId: user.id }, config.jwtSecret);
      }
    }
    throw new Error('Wrong credentials');
  }
}