import { getRepository, Repository } from "typeorm";
import { BuildingType, ItemsType, ItemsRarity, EnvironmentType } from "../../../database/models/сonstantsData";

export default class ConstatntsService {

  // Repositories

  private buildingsTypeRepository: Repository<BuildingType> = getRepository(BuildingType);
  private itemsTypeRepository: Repository<ItemsType> = getRepository(ItemsType);
  private itemsRarityRepository: Repository<ItemsRarity> = getRepository(ItemsRarity);
  private environmentTypeRepository: Repository<EnvironmentType> = getRepository(EnvironmentType);

  // Buildings Types
  public getBuildingsTypes(): Promise<BuildingType[]> {
    return this.buildingsTypeRepository.find();
  }

  public getBuildingsType(id: number): Promise<BuildingType> {
    return this.buildingsTypeRepository.findOne({ where: { id } });
  }

  public async createBuildingsType(name: string): Promise<BuildingType> {
    const testType: BuildingType = await this.buildingsTypeRepository.findOne({ where: { name } });
    if(testType) throw Error("Building type with this name is already exist");
    return this.buildingsTypeRepository.save({ name });
  }

  public async deleteBuildingsType(id: number): Promise<BuildingType> {
    const type: BuildingType = await this.buildingsTypeRepository.findOne({ where: { id } });
    if(!type) throw Error("Building type with this name is not exist");
    return this.buildingsTypeRepository.remove(type);
  }

  // Items Types
  public getItemsTypes(): Promise<ItemsType[]> {
    return this.itemsTypeRepository.find();
  }

  public async getItemsType(id: number): Promise<ItemsType> {
    return this.itemsTypeRepository.findOne({ where: { id } });
  }

  public async createItemsType(name: string): Promise<ItemsType> {
    const testType: ItemsType = await this.itemsTypeRepository.findOne({ where: { name } });
    if(testType) throw Error("Items type with this name is already exist");
    return this.itemsTypeRepository.save({ name });
  }

  public async deleteItemsType(id: number): Promise<ItemsType> {
    const type: ItemsType = await this.itemsTypeRepository.findOne({ where: { id } });
    if(!type) throw Error("Items type with this name is not exist");
    return this.itemsTypeRepository.remove(type);
  }

  // Items Rarity
  public getItemsRarities(): Promise<ItemsRarity[]> {
    return this.itemsRarityRepository.find();
  }

  public async getItemsRarity(id: number): Promise<ItemsRarity> {
    return this.itemsRarityRepository.findOne({ where: { id } });
  }

  public async createItemsRarity(name: string): Promise<ItemsRarity> {
    const testType: ItemsRarity = await this.itemsRarityRepository.findOne({ where: { name } });
    if(testType) throw Error("Items rarity with this name is already exist");
    return this.itemsRarityRepository.save({ name });
  }

  public async deleteItemsRarity(id: number): Promise<ItemsRarity> {
    const type: ItemsRarity = await this.itemsRarityRepository.findOne({ where: { id } });
    if(!type) throw Error("Items rarity with this name is not exist");
    return this.itemsRarityRepository.remove(type);
  }

  // Environments Types
  public getEnvironmentsTypes(): Promise<EnvironmentType[]> {
    return this.environmentTypeRepository.find();
  }

  public getEnvironmentsType(id: number): Promise<EnvironmentType> {
    return this.environmentTypeRepository.findOne({ where: { id } });
  }

  public async createEnvironmentsType(name: string): Promise<EnvironmentType> {
    const testType: EnvironmentType = await this.environmentTypeRepository.findOne({ where: { name } });
    if(testType) throw Error("Environment type with this name is already exist");
    return this.environmentTypeRepository.save({ name });
  }

  public async deleteEnvironmentsType(id: number): Promise<EnvironmentType> {
    const type: EnvironmentType = await this.environmentTypeRepository.findOne({ where: { id } });
    if(!type) throw Error("Environment type with this name is not exist");
    return this.environmentTypeRepository.remove(type);
  }
}

export { BuildingType, ItemsType, ItemsRarity, EnvironmentType } from "../../../database/models/сonstantsData";