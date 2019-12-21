import { getRepository, Repository, DeleteResult } from "typeorm";
import { BuildingType, ItemsType } from "../../../database/models/Constants";

export default class ConstatntsService {
    // Repositories
    private buildingsTypeRepository: Repository<BuildingType> = getRepository(BuildingType);
    private itemsTypeRepository: Repository<ItemsType> = getRepository(ItemsType);

    // Buildings Types
    public getBuildingsTypes(): Promise<BuildingType[]> {
        return this.buildingsTypeRepository.find();
    }

    public getBuildingsType(id: number): Promise<BuildingType> {
        return this.buildingsTypeRepository.findOne({ where: { id } });
    }

    public async createBuildingsType(name: string): Promise<BuildingType> {
        const testType: BuildingType = await this.buildingsTypeRepository.findOne({ where: { type: name } });
        if(testType) throw Error("Building type with this name is already exist");
        return this.buildingsTypeRepository.save({ type: name });
    }

    public deleteBuildingsType(id: number): Promise<DeleteResult> {
        return this.buildingsTypeRepository.delete({ id });
    }

    // Items Types
    public getItemsTypes(): Promise<ItemsType[]> {
        return this.itemsTypeRepository.find();
    }

    public async getItemsType(id: number): Promise<ItemsType> {
        return this.itemsTypeRepository.findOne({ where: { id } });
    }

    public async createItemsType(name: string): Promise<ItemsType> {
        const testType: ItemsType = await this.itemsTypeRepository.findOne({ where: { type: name } });
        if(testType) throw Error("Items type with this name is already exist");
        return this.itemsTypeRepository.save({ type: name });
    }

    public deleteItemsType(id: number): Promise<DeleteResult> {
        return this.itemsTypeRepository.delete({ id });
    }
}