import { getRepository } from "typeorm";
import {
    LocomotiveData,
    LocomotiveDataUpgrade,
    LocomotiveDataUpgradeBuffer,
    LocomotiveDataBuffer,
    LocomotiveBuildingSlot,
    LocomotiveBuildingSlotBuffer
} from "../../../database/models/locomotiveData";
import ItemDataService from "../itemData";
import ConstantsService from "../constants";
import { IUpgradeItem, ILocomotiveBuildingSlot } from "../interfaces";

export default class LocomotiveDataService {

  // Repositories

  private locomotiveDataRepository = getRepository(LocomotiveData);
  private upgradesDataRepository = getRepository(LocomotiveDataUpgrade);
  private locomotiveDataBufferRepository = getRepository(LocomotiveDataBuffer);
  private upgradesDataBufferRepository = getRepository(LocomotiveDataUpgradeBuffer);
  private buildingSlotsRepository = getRepository(LocomotiveBuildingSlot);
  private buildingSlotsBufferRepository = getRepository(LocomotiveBuildingSlotBuffer);

  // Services

  private itemService = new ItemDataService();
  private constantsService = new ConstantsService();

  public async createLocomotiveData(name: string, maxLevel: number, upgrades: IUpgradeItem[], buildingSlots: ILocomotiveBuildingSlot[]): Promise<LocomotiveData> {
    const checkType = await this.locomotiveDataRepository.findOne({ where: { name }});

    if(checkType) throw Error("Locomotive with this name already exists");

    for (let upgradeIndex = 0; upgradeIndex < maxLevel - 1; upgradeIndex++) {
      let { item, count } = upgrades[upgradeIndex];
      const itemData = await this.itemService.getItemById(item.id);

      if(!itemData) throw Error("One of item have invalid item id");
      if(count > itemData.maxCount) count = itemData.maxCount;
    }

    for (let buildingSlotIndex = 0; buildingSlotIndex < maxLevel; buildingSlotIndex++) {
      let { buildingType } = buildingSlots[buildingSlotIndex];
      const buildingTypeData = await this.constantsService.getBuildingsType(buildingType.id);

      if(!buildingTypeData) throw Error("One of building slot have invalid building type");
    }

    const locomotiveData = await this.locomotiveDataRepository.save({ name, inRotation: false, maxLevel });

    upgrades.map(async ({ item, count, level }) => {
      await this.upgradesDataRepository.save({ item, level, count, locomotiveData });
    });

    buildingSlots.map(async ({ buildingType, level }, index) => {
      await this.buildingSlotsRepository.save({ level, buildingType, locomotiveData, index });
    });

    return locomotiveData;
  }

  public async getLocomotiveData(id: number) {
    return this.locomotiveDataRepository.findOne({
      where: { id },
      relations: [
        "upgradesRecipes",
        "upgradesRecipes.item",
        "buildingSlots",
        "buildingSlots.buildingType"
      ]
    });
  }

  public async getLocomotivesTypes() {
    const locomotivesTypes = await this.locomotiveDataRepository.find({
      relations: [
        "updateBuffer",
        "updateBuffer.upgradesRecipes",
        "updateBuffer.buildingSlots",
        "updateBuffer.upgradesRecipes.item",
        "updateBuffer.buildingSlots.buildingType",
        "upgradesRecipes",
        "upgradesRecipes.item",
        "buildingSlots",
        "buildingSlots.buildingType"
      ]
    });

    return { items: locomotivesTypes };
  }

  public async saveUpdateForLocomotive(id: number, maxLevel: number, upgrades: IUpgradeItem[], buildingSlots: ILocomotiveBuildingSlot[]): Promise<LocomotiveData> {
    const locomotiveData = await this.locomotiveDataRepository.findOne({
      where: { id },
      relations: [
        "updateBuffer",
        "updateBuffer.upgradesRecipes",
        "updateBuffer.buildingSlots",
        "upgradesRecipes",
        "upgradesRecipes.item",
        "buildingSlots",
        "buildingSlots.buildingType"
      ]
    });

    if(!locomotiveData) throw Error("Requested locomotive is not exist");

    for (let upgradeIndex = 0; upgradeIndex < maxLevel - 1; upgradeIndex++) {
      let { item, count } = upgrades[upgradeIndex];
      const itemData = await this.itemService.getItemById(item.id);

      if(!itemData) throw Error("One of item have invalid item id");
      if(count > itemData.maxCount) count = itemData.maxCount;
    }

    for (let buildingSlotIndex = 0; buildingSlotIndex < maxLevel; buildingSlotIndex++) {
      let { buildingType } = buildingSlots[buildingSlotIndex];
      const buildingTypeData = await this.constantsService.getBuildingsType(buildingType.id);

      if(!buildingTypeData) throw Error("One of building slot have invalid building type");
    }

    if(locomotiveData.updateBuffer) {
      await this.upgradesDataBufferRepository.remove(locomotiveData.updateBuffer.upgradesRecipes);
      await this.buildingSlotsBufferRepository.remove(locomotiveData.updateBuffer.buildingSlots);
    }

    const upgradesData: LocomotiveDataUpgradeBuffer[] = [];
    const buildingSlotsData: LocomotiveBuildingSlotBuffer[] = [];
    const locomotiveDataBuffer = await this.locomotiveDataBufferRepository.save({ ...locomotiveData.updateBuffer, maxLevel, name: locomotiveData.name });

    upgrades.map(async ({ item, count, level }, index) => {
      upgradesData[index] = await this.upgradesDataBufferRepository.save({ item, level, count, locomotiveData: locomotiveDataBuffer });
    });

    buildingSlots.map(async ({ buildingType, level }, index) => {
      buildingSlotsData[index] = await this.buildingSlotsBufferRepository.save({ level, buildingType, locomotiveData: locomotiveDataBuffer });
    });

    return this.locomotiveDataRepository.save({ ...locomotiveData, updateBuffer: locomotiveDataBuffer });
  }

  public async changeRotationStatus(id: number): Promise<LocomotiveData> {
    const locomotiveData = await this.locomotiveDataRepository.findOne({ where: { id } });

    if(!locomotiveData) throw Error("There is no locomotive with this id");
    return this.locomotiveDataRepository.save({ ...locomotiveData, inRotation: !locomotiveData.inRotation });
  }

  public async removeUpdates(id: number): Promise<LocomotiveDataBuffer> {
    const updateBuffer = await this.locomotiveDataBufferRepository.findOne({ where: { id } });

    if(!updateBuffer) throw Error("There is no incoming update already, please reload the editor");
    return this.locomotiveDataBufferRepository.remove(updateBuffer);
  }

  public async deleteLocomotiveData(id: number): Promise<LocomotiveData> {
    const locomotiveData = await this.locomotiveDataRepository.findOne({ where: { id } });

    if(!locomotiveData) throw Error("There is no locomotive with this id");
    return this.locomotiveDataRepository.remove(locomotiveData);
  }
}
