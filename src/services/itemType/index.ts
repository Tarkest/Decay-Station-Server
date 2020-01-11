import { getRepository, Repository } from "typeorm";
import { ItemType, ItemTypeBuffer } from "../../../database/models/Item";
import { ItemsType, ItemsRarity } from "../../../database/models/Constants";
import ConstatntsService from "../constants";
import { itemTypeDTO } from "./utils"

export default class ItemTypeService {
    //Repositories
    private itemTypeRepository: Repository<ItemType> = getRepository(ItemType);
    private itemTypeBufferRepository: Repository<ItemTypeBuffer> = getRepository(ItemTypeBuffer);

    //Services
    private constantsService: ConstatntsService = new ConstatntsService();

    public async createItemType(name: string, maxCount: number, typeId: number, rarityId: number): Promise<ItemType> {
        const checkType: ItemType = await this.itemTypeRepository.findOne({ where: { name } });
        if(checkType) throw Error("There is item with this name");
        const currentType: ItemsType = await this.constantsService.getItemsType(typeId);
        const currentRarity: ItemsRarity = await this.constantsService.getItemsRarity(rarityId);
        return this.itemTypeRepository.save({ name, maxCount, type: currentType, rarity: currentRarity, inRotation: false });
    }

    public async getItemsTypes() {
        const types = await this.itemTypeRepository.find({ relations: [ "updateBuffer", "type", "rarity", "updateBuffer.type", "updateBuffer.rarity" ] });
        return { items: types };
    }

    public async saveUpdateForItemType(id: number, maxCount: number, typeId: number, rarityId: number): Promise<ItemType> {
        let itemType: ItemType = await this.itemTypeRepository.findOne({ where:{ id }, relations: [ "updateBuffer", "type", "rarity" ] });
        if(!itemType) throw Error("Requested item is not exist");
        const newItemsType: ItemsType = await this.constantsService.getItemsType(typeId);
        const newItemsRarity: ItemsRarity = await this.constantsService.getItemsRarity(rarityId);
        const itemTypeBuffer: ItemTypeBuffer = await this.itemTypeBufferRepository.save({ ...itemType.updateBuffer, name: itemType.name, maxCount, type: newItemsType, currentVersion: itemType, rarity: newItemsRarity });
        return this.itemTypeRepository.save({ ...itemType, updateBuffer: itemTypeBuffer });
    }

    public async changeRotationStatus(id: number) {
        let itemType: ItemType = await this.itemTypeRepository.findOne({ where:{ id }, relations: [ "updateBuffer", "type", "rarity" ] });
        return this.itemTypeRepository.save({ ...itemType, inRotation: !itemType.inRotation });
    }

    public async removeUpdate(id: number) {
        let updateBuffer: ItemTypeBuffer = await this.itemTypeBufferRepository.findOne({ where:{ id } });
        if(!updateBuffer) throw Error("There is no incoming update already, please reload the editor");
        return this.itemTypeBufferRepository.remove(updateBuffer);
    }
}
