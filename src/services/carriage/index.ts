import { getRepository } from "typeorm";
import { Carriage, CarriageAssembleSlot, CarriageBuilding } from "../../../database/models/carriage";
import InventoryService from "../inventory";
import CarriageDataService from "../carriageData";
import { AccountData } from "../accountService";

export { Carriage } from "../../../database/models/carriage";

export default class CarriageService {

  // Repositories

  private carriageRepository = getRepository(Carriage);
  private assemblySlotsRepository = getRepository(CarriageAssembleSlot);
  private buildingsRepository = getRepository(CarriageBuilding);

  // Services

  private inventoryService = new InventoryService();
  private carriageDataService = new CarriageDataService();

  public async createCarriage(accountData: AccountData, carriageDataId: number): Promise<Carriage> {
    const carriageData = await this.carriageDataService.getCarriageData(carriageDataId);
    const carriage = await this.carriageRepository.save({ account: accountData, data: carriageData });

    if(carriageData.assemblyItems.length) {

      await this.assemblySlotsRepository.save(
        carriageData.assemblyItems
        .map(item => ({
          count: 0,
          requiredCount: item.count,
          item: item.item,
          carriage
        }))
      );

    } else {

      await this.buildingsRepository.save(
        carriageData.buildingSlots
        .map((building, index) => ({
          ...building,
          index,
          carriage
        }))
      );

    }

    await this.inventoryService.createCarriageSlots(carriage);

    return carriage;
  }
}
