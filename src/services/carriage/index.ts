import { getRepository, Repository } from "typeorm";
import { Carriage } from "../../../database/models/carriage";
import InventoryService, { InventorySlot } from "../inventory";
import CarriageDataService, { CarriageData } from "../carriageData";
import { AccountData } from "../accountService";


export default class CarriageService {

  // Repositories

  private dataRepository: Repository<Carriage> = getRepository(Carriage);

  // Services

  private inventoryService: InventoryService = new InventoryService();
  private carriageDataService: CarriageDataService = new CarriageDataService();

  public async createCarriage(accountData: AccountData, carriageDataId: number) {
    const carriageData: CarriageData = await this.carriageDataService.getCarriageData(carriageDataId);
    const carriage: Carriage = await this.dataRepository.save({ account: accountData, data: carriageData });
    await this.inventoryService.createCarriageSlots(carriage);
    return carriage;
  }
}

export { Carriage } from "../../../database/models/carriage";
