import { getRepository, Repository } from "typeorm";
import { LocomotiveData } from "../../../database/models/Locomotive/locomotiveData";
import { LocomotiveDataUpgrade } from "../../../database/models/Locomotive/locomotiveUpgradeData";
import { LocomotiveDataUpgradeBuffer } from "../../../database/models/Locomotive/locomotiveUpgradeDataBuffer";
import { LocomotiveDataBuffer } from "../../../database/models/Locomotive/locomotiveDataBuffer";
import ItemDataService, { ItemData } from "../itemData";
import { UpgradeItem } from "../../sharedUtilities/interfaces";

export default class LocomotiveDataService {

    // Repositories

    private dataRepository: Repository<LocomotiveData> = getRepository(LocomotiveData);
    private upgradesDataRepository: Repository<LocomotiveDataUpgrade> = getRepository(LocomotiveDataUpgrade);
    private dataBufferRepository: Repository<LocomotiveDataBuffer> = getRepository(LocomotiveDataBuffer);
    private upgradesDataBufferRepository : Repository<LocomotiveDataUpgradeBuffer> = getRepository(LocomotiveDataUpgradeBuffer);

    // Services

    private itemService: ItemDataService = new ItemDataService();

    public async createLocomotiveData(name: string, maxLevel: number, upgrades: UpgradeItem[]): Promise<LocomotiveData> {
        const checkType: LocomotiveData = await this.dataRepository.findOne({ where: { name }});
        if(checkType) throw Error("Locomotive with this name already exists");
        const upgradesData: LocomotiveDataUpgrade[] = [];
        for (let upgradeIndex = 0; upgradeIndex < maxLevel - 1; upgradeIndex++) {
            let { id: itemId, count, level } = upgrades[upgradeIndex];
            const item: ItemData = await this.itemService.getItemById(itemId);
            if(!item) throw Error("One of item have invalid item id");
            if(count > item.maxCount) count = item.maxCount;
            upgradesData[upgradeIndex] = await this.upgradesDataRepository.save({ item, level, count });
        }
        return this.dataRepository.save({ name, inRotation: false, maxLevel, upgradesRecipes: upgradesData });
    }

    public async getLocomotivesTypes() {
        const locomotivesTypes = await this.dataRepository.find({ relations: ["updateBuffer", "upgradesRecipes", "upgradesRecipes.item"] });
        return { items: locomotivesTypes };
    }

    public async saveUpdateForLocomotive(id: number, upgrades: UpgradeItem[]): Promise<LocomotiveData> {
        const locomotiveData: LocomotiveData = await this.dataRepository.findOne({ where: { id }, relations: ["updateBuffer", "updateBuffer.upgradesRecipes", "upgradesRecipes", "upgradesRecipes.item"] });
        if(!locomotiveData) throw Error("Requested locomotive is not exist");
        const upgradesData: LocomotiveDataUpgradeBuffer[] = [];
        if(locomotiveData.updateBuffer) {
            await this.upgradesDataBufferRepository.remove(locomotiveData.updateBuffer.upgradesRecipes);
        }
        for (let upgradeIndex = 0; upgradeIndex < upgrades.length; upgradeIndex++) {
            let { id: itemId, count, level } = upgrades[upgradeIndex];
            const item: ItemData = await this.itemService.getItemById(itemId);
            if(count > item.maxCount) count = item.maxCount;
            upgradesData[upgradeIndex] = await this.upgradesDataBufferRepository.save({ item, level, count });
        }
        const updateBuffer = await this.dataBufferRepository.save({ ...locomotiveData.updateBuffer, name: locomotiveData.name, upgradesRecipes: upgradesData, currentVersion: locomotiveData });
        return this.dataRepository.save({ ...locomotiveData, updateBuffer });
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
