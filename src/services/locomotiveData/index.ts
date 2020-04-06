import { getRepository, Repository } from "typeorm";
import {
    LocomotiveData,
    LocomotiveDataUpgrade,
    LocomotiveDataUpgradeBuffer,
    LocomotiveDataBuffer,
    LocomotiveBuildingSlot,
    LocomotiveBuildingSlotBuffer
} from "../../../database/models/locomotive";
import ItemDataService, { ItemData } from "../itemData";
import ConstantsService, { BuildingType } from "../constants";
import { IUpgradeItem, ILocomotiveBuildingSlot } from "../interfaces";

export default class LocomotiveDataService {

    // Repositories

    private dataRepository: Repository<LocomotiveData> = getRepository(LocomotiveData);
    private upgradesDataRepository: Repository<LocomotiveDataUpgrade> = getRepository(LocomotiveDataUpgrade);
    private dataBufferRepository: Repository<LocomotiveDataBuffer> = getRepository(LocomotiveDataBuffer);
    private upgradesDataBufferRepository: Repository<LocomotiveDataUpgradeBuffer> = getRepository(LocomotiveDataUpgradeBuffer);
    private buildingSlotsRepository: Repository<LocomotiveBuildingSlot> = getRepository(LocomotiveBuildingSlot);
    private buildingSlotsBufferRepository: Repository<LocomotiveBuildingSlotBuffer> = getRepository(LocomotiveBuildingSlotBuffer);

    // Services

    private itemService: ItemDataService = new ItemDataService();
    private constantsService: ConstantsService = new ConstantsService();

    public async createLocomotiveData(name: string, maxLevel: number, upgrades: IUpgradeItem[], buildingSlots: ILocomotiveBuildingSlot[]): Promise<LocomotiveData> {
        const checkType: LocomotiveData = await this.dataRepository.findOne({ where: { name }});
        if(checkType) throw Error("Locomotive with this name already exists");
        for (let upgradeIndex = 0; upgradeIndex < maxLevel - 1; upgradeIndex++) {
            let { item, count } = upgrades[upgradeIndex];
            const itemData: ItemData = await this.itemService.getItemById(item.id);
            if(!itemData) throw Error("One of item have invalid item id");
            if(count > itemData.maxCount) count = itemData.maxCount;
        }
        for (let buildingSlotIndex = 0; buildingSlotIndex < maxLevel; buildingSlotIndex++) {
            let { buildingType } = buildingSlots[buildingSlotIndex];
            const buildingTypeData: BuildingType = await this.constantsService.getBuildingsType(buildingType.id);
            if(!buildingTypeData) throw Error("One of building slot have invalid building type");
        }
        const upgradesData: LocomotiveDataUpgrade[] = [];
        const buildingSlotsData: LocomotiveBuildingSlot[] = [];
        const locomotiveData: LocomotiveData = await this.dataRepository.save({ name, inRotation: false, maxLevel });
        upgrades.map(async ({ item, count, level }, index) => {
            upgradesData[index] = await this.upgradesDataRepository.save({ item, level, count, locomotiveData });
        });
        buildingSlots.map(async ({ buildingType, level }, index) => {
            buildingSlotsData[index] = await this.buildingSlotsRepository.save({ level, buildingType, locomotiveData });
        });
        return locomotiveData;
    }

    public async getLocomotivesTypes() {
        const locomotivesTypes = await this.dataRepository.find({
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
        const locomotiveData: LocomotiveData = await this.dataRepository.findOne({
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
            const itemData: ItemData = await this.itemService.getItemById(item.id);
            if(!itemData) throw Error("One of item have invalid item id");
            if(count > itemData.maxCount) count = itemData.maxCount;
        }
        for (let buildingSlotIndex = 0; buildingSlotIndex < maxLevel; buildingSlotIndex++) {
            let { buildingType } = buildingSlots[buildingSlotIndex];
            const buildingTypeData: BuildingType = await this.constantsService.getBuildingsType(buildingType.id);
            if(!buildingTypeData) throw Error("One of building slot have invalid building type");
        }
        if(locomotiveData.updateBuffer) {
            await this.upgradesDataBufferRepository.remove(locomotiveData.updateBuffer.upgradesRecipes);
            await this.buildingSlotsBufferRepository.remove(locomotiveData.updateBuffer.buildingSlots);
        }
        const upgradesData: LocomotiveDataUpgradeBuffer[] = [];
        const buildingSlotsData: LocomotiveBuildingSlotBuffer[] = [];
        const locomotiveDataBuffer: LocomotiveDataBuffer = await this.dataBufferRepository.save({ ...locomotiveData.updateBuffer, maxLevel, name: locomotiveData.name });
        upgrades.map(async ({ item, count, level }, index) => {
            upgradesData[index] = await this.upgradesDataBufferRepository.save({ item, level, count, locomotiveData: locomotiveDataBuffer });
        });
        buildingSlots.map(async ({ buildingType, level }, index) => {
            buildingSlotsData[index] = await this.buildingSlotsBufferRepository.save({ level, buildingType, locomotiveData: locomotiveDataBuffer });
        });
        return this.dataRepository.save({ ...locomotiveData, updateBuffer: locomotiveDataBuffer });
    }

    public async changeRotationStatus(id: number): Promise<LocomotiveData> {
        const locomotiveData: LocomotiveData = await this.dataRepository.findOne({ where: { id } });
        return this.dataRepository.save({ ...locomotiveData, inRotation: !locomotiveData.inRotation });
    }

    public async removeUpdates(id: number) {
        const updateBuffer: LocomotiveDataBuffer = await this.dataBufferRepository.findOne({ where: { id } });
        if(!updateBuffer) throw Error("There is no incoming update already, please reload the editor");
        return this.dataBufferRepository.remove(updateBuffer);
    }

    public async deleteLocomotiveData(id: number) {
        const locomotiveData: LocomotiveData = await this.dataRepository.findOne({ where: { id } });
        if(!locomotiveData) throw Error("There is no locomotive with such id");
        return this.dataRepository.remove(locomotiveData);
    }
}
