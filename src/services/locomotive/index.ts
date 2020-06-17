import { getRepository } from "typeorm";
import { Locomotive, LocomotiveBuilding, LocomotiveUpdateSlot } from "../../../database/models/locomotive";
import LocomotiveDataService from "../locomotiveData";
import { AccountData } from "../accountService";


export default class LocomotiveService {

  // Repositories

  private dataRepository = getRepository(Locomotive);
  private buildingsRepository = getRepository(LocomotiveBuilding);
  private upgradesSlotsRepository = getRepository(LocomotiveUpdateSlot);

  // Services

  private locomotiveDataService: LocomotiveDataService = new LocomotiveDataService();

  public async createLocomotive(accountData: AccountData, locomotiveDataId: number) {
    const locomotiveData = await this.locomotiveDataService.getLocomotiveData(locomotiveDataId);
    const locomotive = await this.dataRepository.save({ account: accountData, name: accountData.userName, data: locomotiveData, level: 1 });

    await this.buildingsRepository.save(
      locomotiveData.buildingSlots
      .filter(slot => slot.level === 1)
      .map(slot => ({
        ...slot,
        index: slot.level,
        locomotive
      }))
    );

    await this.upgradesSlotsRepository.save(
      locomotiveData.upgradesRecipes
      .filter(upgrade => upgrade.level === 1)
      .map(upgrade => ({
        count: 0,
        requiredCount:
        upgrade.count,
        item: upgrade.item,
        locomotive
      }))
    );

    return locomotive;
  }
}
