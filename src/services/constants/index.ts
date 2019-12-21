import { getRepository, Repository, DeleteResult } from "typeorm";
import { BuildingType, ItemsType } from "../../../database/models/Constants";

export default class ConstatntsService {
    private buildingsTypeRepository: Repository<BuildingType> = getRepository(BuildingType);
    private itemsTypeRepository: Repository<ItemsType> = getRepository(ItemsType);

    public getBuildingsTypes(): Promise<BuildingType[]> {
        return this.buildingsTypeRepository.find();
    }

    public getItemsTypes(): Promise<ItemsType[]> {
        return this.itemsTypeRepository.find();
    }

    public getBuildingsType(id: number): Promise<BuildingType> {
        return this.buildingsTypeRepository.findOne({ where: { id } });
    }

    public async getItemsType(id: number): Promise<ItemsType> {
        return this.itemsTypeRepository.findOne({ where: { id } });
    }

    public createBuildingsType(name: string): Promise<BuildingType> {
        return this.buildingsTypeRepository.save({ type: name });
    }

    public createItemsType(name: string): Promise<ItemsType> {
        return this.itemsTypeRepository.save({ type: name });
    }

    public deleteBuildingsType(id: number): Promise<DeleteResult> {
        return this.buildingsTypeRepository.delete({ id });
    }

    public deleteItemsType(id: number): Promise<DeleteResult> {
        return this.itemsTypeRepository.delete({ id });
    }
}