import { getRepository, Repository } from "typeorm";
import {
  CarriageAssemblyItem,
  CarriageAssemblyItemBuffer,
  CarriageBuildingSlot,
  CarriageBuildingSlotBuffer,
  CarriageData,
  CarriageDataBuffer
} from "../../../database/models/carriage";
import ItemDataService, { ItemData } from "../itemData";
import ConstantsService, { BuildingType } from "../constants";
import { IAssemablyItem, ICarriageBuildingSlot } from "../interfaces";

export default class CarriageDataService {

  // Repositories

  private dataRepository: Repository<CarriageData> = getRepository(CarriageData);
  private assemblyItemsRepository: Repository<CarriageAssemblyItem> = getRepository(CarriageAssemblyItem);
  private dataBufferRepository: Repository<CarriageDataBuffer> = getRepository(CarriageDataBuffer);
  private assemblyItemsBuffersRepository: Repository<CarriageAssemblyItemBuffer> = getRepository(CarriageAssemblyItemBuffer);
  private buildingSlotsRepository: Repository<CarriageBuildingSlot> = getRepository(CarriageBuildingSlot);
  private buildingSlotsBufferRepository: Repository<CarriageBuildingSlotBuffer> = getRepository(CarriageBuildingSlotBuffer);

  // Services

  private itemService: ItemDataService = new ItemDataService();
  private constantsService: ConstantsService = new ConstantsService();

  public async createCarriageData(name: string, storageCapacity: number, crewCapacity: number, assemblyItems: IAssemablyItem[], buildingSlots: ICarriageBuildingSlot[]): Promise<CarriageData> {
    const checkType: CarriageData = await this.dataRepository.findOne({ where: { name } });
    if(checkType) throw Error("Carriage with this name already exists");
    for (const assemblyItem of assemblyItems) {
      let { count, item } = assemblyItem;
      const itemData: ItemData = await this.itemService.getItemById(item.id);
      if(!itemData) throw Error("One of item have invalid item id");
      if(count > itemData.maxCount) count = itemData.maxCount;
    }
    for (const buildingSlot of buildingSlots) {
      let { buildingType } = buildingSlot;
      const buildingTypeData: BuildingType = await this.constantsService.getBuildingsType(buildingType.id);
      if(!buildingTypeData) throw Error("One of building slot have invalid building type");
    }
    const assemblyItemsData: CarriageAssemblyItem[] = [];
    const buildingSlotsData: CarriageBuildingSlot[] = [];
    const carriageData: CarriageData = await this.dataRepository.save({ name, storageCapacity, crewCapacity, inRotation: false });
    assemblyItems.map(async ({ item, count }, index) => {
      assemblyItemsData[index] = await this.assemblyItemsRepository.save({ item, count, carriageData });
    });
    buildingSlots.map(async ({ buildingSize, buildingType }, index) => {
      buildingSlotsData[index] = await this.buildingSlotsRepository.save({ buildingSize, buildingType, carriageData });
    });
    return carriageData;
  }

  public async getCarriagesTypes() {
    const carriagesData = await this.dataRepository.find({
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

  public async saveUpdateForCarriage(id: number, storageCapacity: number, crewCapacity: number, assemblyItems: IAssemablyItem[], buildingSlots: ICarriageBuildingSlot[]): Promise<CarriageData> {
    const carriageData: CarriageData = await this.dataRepository.findOne({ 
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
      const itemData: ItemData = await this.itemService.getItemById(item.id);
      if(!itemData) throw Error("One of item have invalid item id");
      if(count > itemData.maxCount) count = itemData.maxCount;
    }
    for (const buildingSlot of buildingSlots) {
      let { buildingType } = buildingSlot;
      const buildingTypeData: BuildingType = await this.constantsService.getBuildingsType(buildingType.id);
      if(!buildingTypeData) throw Error("One of building slot have invalid building type");
    }
    if(carriageData.updateBuffer) {
      await this.assemblyItemsBuffersRepository.remove(carriageData.updateBuffer.assemblyItems);
      await this.buildingSlotsBufferRepository.remove(carriageData.updateBuffer.buildingSlots);
    }
    const assemblyItemsData: CarriageAssemblyItemBuffer[] = [];
    const buildingSlotsData: CarriageBuildingSlotBuffer[] = [];
    const carriageDataBuffer: CarriageDataBuffer = await this.dataBufferRepository.save({ ...carriageData.updateBuffer, storageCapacity, crewCapacity, name: carriageData.name });
    assemblyItems.map(async ({ item, count }, index) => {
      assemblyItemsData[index] = await this.assemblyItemsBuffersRepository.save({ item, count, carriageData: carriageDataBuffer });
    });
    buildingSlots.map(async ({ buildingSize, buildingType }, index) => {
      buildingSlotsData[index] = await this.buildingSlotsBufferRepository.save({ buildingSize, buildingType, carriageData: carriageDataBuffer });
    });
    return this.dataRepository.save({ ...carriageData, updateBuffer: carriageDataBuffer });
  }

  public async changeRotationStatus(id: number): Promise<CarriageData> {
    const carriageData: CarriageData = await this.dataRepository.findOne({ where: { id } });
    return this.dataRepository.save({ ...carriageData, inRotation: !carriageData.inRotation });
  }

  public async removeUpdates(id: number) {
    const updateBuffer: CarriageDataBuffer = await this.dataBufferRepository.findOne({ where: { id } });
    if(!updateBuffer) throw Error("There is no incoming update already, please reload the editor");
    return this.dataBufferRepository.remove(updateBuffer);
  }

  public async deleteCarriageData(id: number) {
    const carriageData: CarriageData = await this.dataRepository.findOne({ where: { id } });
    if(!carriageData) throw Error("There is no locomotive with such id");
    return this.dataRepository.remove(carriageData);
  }
}