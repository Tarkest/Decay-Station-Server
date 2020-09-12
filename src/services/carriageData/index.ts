import { getRepository } from "typeorm";
import {
  CarriageAssemblyItem,
  CarriageAssemblyItemBuffer,
  CarriageBuildingSlot,
  CarriageBuildingSlotBuffer,
  CarriageData,
  CarriageDataBuffer
} from "../../../database/models/carriageData";
import ItemDataService from "../itemData";
import ConstantsService from "../constants";
import { IAssemablyItem, ICarriageBuildingSlot } from "../interfaces";

export default class CarriageDataService {

  // Repositories

  private carriageDataRepository = getRepository(CarriageData);
  private assemblyItemsRepository = getRepository(CarriageAssemblyItem);
  private carriageDataBufferRepository = getRepository(CarriageDataBuffer);
  private assemblyItemsBuffersRepository = getRepository(CarriageAssemblyItemBuffer);
  private buildingSlotsRepository = getRepository(CarriageBuildingSlot);
  private buildingSlotsBufferRepository = getRepository(CarriageBuildingSlotBuffer);

  // Services

  private itemService = new ItemDataService();
  private constantsService = new ConstantsService();

  public async createCarriageData(name: string, storageCapacity: number, crewCapacity: number, assemblyItems: IAssemablyItem[], buildingSlots: ICarriageBuildingSlot[]): Promise<CarriageData> {
    const checkType = await this.carriageDataRepository.findOne({ where: { name } });

    if(checkType) throw Error("Carriage with this name already exists");

    for (const assemblyItem of assemblyItems) {

      let { count, item } = assemblyItem;
      const itemData = await this.itemService.getItemById(item.id);

      if(!itemData) throw Error("One of item have invalid item id");
      if(count > itemData.maxCount) count = itemData.maxCount;
    }

    for (const buildingSlot of buildingSlots) {

      const { buildingType } = buildingSlot;
      const buildingTypeData = await this.constantsService.getBuildingsType(buildingType.id);

      if(!buildingTypeData) throw Error("One of building slot have invalid building type");
    }

    const carriageData = await this.carriageDataRepository.save({ name, storageCapacity, crewCapacity, inRotation: false });

    assemblyItems.map(async ({ item, count }) => {
      await this.assemblyItemsRepository.save({ item, count, carriageData });
    });

    buildingSlots.map(async ({ buildingSize, buildingType }, index) => {
      await this.buildingSlotsRepository.save({ buildingSize, buildingType, carriageData, index });
    });

    return carriageData;
  }

  public async getCarriagesTypes() {
    const carriagesData = await this.carriageDataRepository.find({
      relations: [
        "updateBuffer",
        "updateBuffer.assemblyItems",
        "updateBuffer.buildingSlots",
        "updateBuffer.assemblyItems.item",
        "updateBuffer.buildingSlots.buildingType",
        "assemblyItems",
        "assemblyItems.item",
        "buildingSlots",
        "buildingSlots.buildingType"
      ]
    });
    return { items: carriagesData }
  }

  public async getCarriageData(id: number) {
    return this.carriageDataRepository.findOne({
      where: { id },
      relations: [
        "assemblyItems",
        "assemblyItems.item",
        "buildingSlots",
        "buildingSlots.buildingType"
      ]
    });
  }

  public async saveUpdateForCarriage(id: number, storageCapacity: number, crewCapacity: number, assemblyItems: IAssemablyItem[], buildingSlots: ICarriageBuildingSlot[]): Promise<CarriageData> {
    const carriageData = await this.carriageDataRepository.findOne({
      where: { id },
      relations: [
        "updateBuffer",
        "updateBuffer.assemblyItems",
        "updateBuffer.buildingSlots",
        "updateBuffer.assemblyItems.item",
        "updateBuffer.buildingSlots.buildingType",
        "assemblyItems",
        "assemblyItems.item",
        "buildingSlots",
        "buildingSlots.buildingType"
      ]
    });

    if(!carriageData) throw Error("Requested locomotive is not exist");

    for (const assemblyItem of assemblyItems) {
      let { count, item } = assemblyItem;
      const itemData = await this.itemService.getItemById(item.id);

      if(!itemData) throw Error("One of item have invalid item id");
      if(count > itemData.maxCount) count = itemData.maxCount;
    }

    for (const buildingSlot of buildingSlots) {
      let { buildingType } = buildingSlot;
      const buildingTypeData = await this.constantsService.getBuildingsType(buildingType.id);

      if(!buildingTypeData) throw Error("One of building slot have invalid building type");
    }

    if(carriageData.updateBuffer) {
      await this.assemblyItemsBuffersRepository.remove(carriageData.updateBuffer.assemblyItems);
      await this.buildingSlotsBufferRepository.remove(carriageData.updateBuffer.buildingSlots);
    }

    const assemblyItemsData: CarriageAssemblyItemBuffer[] = [];
    const buildingSlotsData: CarriageBuildingSlotBuffer[] = [];
    const carriageDataBuffer = await this.carriageDataBufferRepository.save({ ...carriageData.updateBuffer, storageCapacity, crewCapacity, name: carriageData.name });

    assemblyItems.map(async ({ item, count }, index) => {
      assemblyItemsData[index] = await this.assemblyItemsBuffersRepository.save({ item, count, carriageData: carriageDataBuffer });
    });

    buildingSlots.map(async ({ buildingSize, buildingType }, index) => {
      buildingSlotsData[index] = await this.buildingSlotsBufferRepository.save({ buildingSize, buildingType, carriageData: carriageDataBuffer });
    });

    return this.carriageDataRepository.save({ ...carriageData, updateBuffer: carriageDataBuffer });
  }

  public async changeRotationStatus(id: number): Promise<CarriageData> {
    const carriageData = await this.carriageDataRepository.findOne({ where: { id } });

    return this.carriageDataRepository.save({ ...carriageData, inRotation: !carriageData.inRotation });
  }

  public async removeUpdates(id: number) {
    const updateBuffer = await this.carriageDataBufferRepository.findOne({ where: { id } });

    if(!updateBuffer) throw Error("There is no incoming update already, please reload the editor");
    return this.carriageDataBufferRepository.remove(updateBuffer);
  }

  public async deleteCarriageData(id: number) {
    const carriageData = await this.carriageDataRepository.findOne({ where: { id } });

    if(!carriageData) throw Error("There is no locomotive with such id");
    return this.carriageDataRepository.remove(carriageData);
  }
}
