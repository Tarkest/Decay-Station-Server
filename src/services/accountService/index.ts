import { Repository, getRepository } from "typeorm";
import CarriageService from "../carriage";
import { AccountData } from "../../../database/models/userData";
import MapService, { SectorData } from "../mapData";
import { v4 as uuid } from "uuid";
import { sign } from "jsonwebtoken";
import * as config from "../../../config.json";


export default class AccountService {

  // Repositories
  private dataRepository: Repository<AccountData> = getRepository(AccountData);

  // Services
  private carriageService: CarriageService = new CarriageService();
  private mapService: MapService = new MapService();

  public async login(googleId: string) {
    let account: AccountData = await this.dataRepository.findOne({ where: { googleId }});

    if(!account) {
      account = await this.createAccount(googleId);
    }

    return sign({ userId: account.id }, config.jwtSecret);
  }

  private async createAccount(googleId: string): Promise<AccountData> {
    const mapSector: SectorData = await this.mapService.getSectorData(1, 1);
    const newAccount: AccountData = await this.dataRepository.save({ userName: uuid(), googleId, currentMapSector: mapSector });
    await this.carriageService.createCarriage(newAccount, 1);

    return newAccount;
  }
}

export { AccountData } from "../../../database/models/userData";
