import { getRepository } from "typeorm";
import CarriageService from "../carriage";
import LocomotiveService from "../locomotive";
import { AccountData } from "../../../database/models/userData";
import CrewMemberService from "../crewMemberService";
import MapService from "../mapData";
import { v4 as uuid } from "uuid";
import { sign } from "jsonwebtoken";
import * as config from "../../../config.json";


export default class AccountService {

  // Repositories
  private accountDataRepository = getRepository(AccountData);

  // Services
  private carriageService = new CarriageService();
  private mapService = new MapService();
  private locomotiveService = new LocomotiveService();
  private crewMemberService = new CrewMemberService();

  public async login(googleId: string) {
    let account = await this.accountDataRepository.findOne({ where: { googleId }});

    if(!account) {
      account = await this.createAccount(googleId);
    }

    return sign({ userId: account.id }, config.jwtSecret);
  }

  private async createAccount(googleId: string): Promise<AccountData> {
    const mapSector = await this.mapService.getSectorData(1, 1);
    const newAccount = await this.accountDataRepository.save({ userName: uuid(), googleId, currentMapSector: mapSector });
    await this.locomotiveService.createLocomotive(newAccount, 1);
    await this.carriageService.createCarriage(newAccount, 1);
    await this.crewMemberService.createDriver(newAccount);

    return newAccount;
  }

  public async getAccountData(userId: number) {
    return this.accountDataRepository.findOne({
      where: {
        id: userId
      },
      relations: [
        "driver",
        "driver.inventory",
        "driver.inventory.item",
        "driver.equipment",
        "driver.equipment.item",
        "currentMapSector",
        "locomotive",
        "locomotive.data",
        "locomotive.upgradeSlots",
        "locomotive.upgradeSlots.item",
        "locomotive.buildings",
        "locomotive.buildings.currentBuilding",
        "carriages",
        "carriages.data",
        "carriages.crew",
        "carriages.crew.inventory",
        "carriages.crew.inventory.item",
        "carriages.crew.equipment",
        "carriages.crew.equipment.item",
        "carriages.assembleSlots",
        "carriages.assembleSlots.item",
        "carriages.buildings",
        "carriages.buildings.currentBuilding",
        "carriages.inventory",
        "carriages.inventory.item",
      ]
    }).then((data) => ({ ...data, id: undefined })); //Exclude id from response
  }
}

export { AccountData } from "../../../database/models/userData";
