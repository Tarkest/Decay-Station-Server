import { getRepository, Repository } from "typeorm";
import { LocomotiveType } from "../../../database/models/Locomotive/LocomotiveType";
import { LocomotiveTypeUpgrade } from "../../../database/models/Locomotive/LocomotiveTypeUpgrade";
import { LocomotiveTypeUpgradeBuffer } from "../../../database/models/Locomotive/LocomotiveTypeUpgradeBuffer";
import { LocomotiveTypeBuffer } from "../../../database/models/Locomotive/LocomotiveTypeBuffer";
import ItemTypeService, { ItemType } from "../itemType";
import { UpgradeItem } from "../../sharedUtilities/interfaces";

export default class LocomotiveTypeService {
    //repositories
    private typeRepository: Repository<LocomotiveType> = getRepository(LocomotiveType);
    private typeUpgradeRepository: Repository<LocomotiveTypeUpgrade> = getRepository(LocomotiveTypeUpgrade);
    private typeBufferRepository: Repository<LocomotiveTypeBuffer> = getRepository(LocomotiveTypeBuffer);
    private typeUpgradeBufferRepository : Repository<LocomotiveTypeUpgradeBuffer> = getRepository(LocomotiveTypeUpgradeBuffer);

    //services
    private itemService: ItemTypeService = new ItemTypeService();

    public async createLocomotiveType(name: string, upgrades: UpgradeItem[]): Promise<LocomotiveType> {
        const checkType: LocomotiveType = await this.typeRepository.findOne({ where: { name }});
        if(checkType) throw Error("Locomotive with this name already exists");
        let upgradesData: LocomotiveTypeUpgrade[] = [];
        for (let upgradeIndex = 0; upgradeIndex < upgrades.length; upgradeIndex++) {
            let { id, count, level } = upgrades[upgradeIndex];
            let item: ItemType = await this.itemService.getItemById(id);
            if(count > item.maxCount) count = item.maxCount;
            upgradesData[upgradeIndex] = await this.typeUpgradeRepository.save({ item, level, count });
        }
        return this.typeRepository.save({ name, inRotation: false, upgradesRecipes: upgradesData });
    }

    public async getLocomotivesTypes() {
        const locomotivesTypes = await this.typeRepository.find({ relations: ["updateBuffer", "upgradesRecipes", "upgradesRecipes.item"] });
        return { items: locomotivesTypes };
    }    

    public async saveUpdateForLocomotive(id: number, upgrades: UpgradeItem[]): Promise<LocomotiveType> {
        let locomotiveType: LocomotiveType = await this.typeRepository.findOne({ where: { id }, relations: ["updateBuffer", "updateBuffer.upgradesRecipes", "upgradesRecipes", "upgradesRecipes.item"] });
        if(!locomotiveType) throw Error("Requested locomotive is not exist");
        let upgradesData: LocomotiveTypeUpgradeBuffer[] = [];
        if(locomotiveType.updateBuffer) {
            await this.typeUpgradeBufferRepository.remove(locomotiveType.updateBuffer.upgradesRecipes);
        }
        for (let upgradeIndex = 0; upgradeIndex < upgrades.length; upgradeIndex++) {
            let { id, count, level } = upgrades[upgradeIndex];
            let item: ItemType = await this.itemService.getItemById(id);
            if(count > item.maxCount) count = item.maxCount;
            upgradesData[upgradeIndex] = await this.typeUpgradeBufferRepository.save({ item, level, count });
        }
        const updateBuffer = await this.typeBufferRepository.save({ ...locomotiveType.updateBuffer, name: locomotiveType.name, upgradesRecipes: upgradesData, currentVersion: locomotiveType });
        return this.typeRepository.save({ ...locomotiveType, updateBuffer });
    }

    public async changeRotationStatus(id: number): Promise<LocomotiveType> {
        let locomotiveType: LocomotiveType = await this.typeRepository.findOne({ where: { id } });
        return this.typeRepository.save({ ...locomotiveType, inRotation: !locomotiveType.inRotation });
    }

    public async removeUpdates(id: number) {
        let updateBuffer: LocomotiveTypeBuffer = await this.typeBufferRepository.findOne({ where: { id } });
        if(!updateBuffer) throw Error("There is no incoming update already, please reload the editor");
        return this.typeBufferRepository.remove(updateBuffer);
    }

    public async deleteLocomotiveType() {
        
    }
}