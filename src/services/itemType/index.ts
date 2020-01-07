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
        return this.itemTypeRepository.save({ name, maxCount, itemType: currentType, itemRarity: currentRarity });
    }

    public async getItemsTypes() {
        const types = await this.itemTypeRepository.find({ relations: [ "updateBuffer", "itemType", "itemRarity", "updateBuffer.itemType", "updateBuffer.itemRarity" ] });
        return { items: types };
    }

    public async saveUpdateForItemType(id: number, maxCount: number, typeId: number, rarityId: number): Promise<ItemType> {
        let itemType: ItemType = await this.itemTypeRepository.findOne({ where:{ id }, relations: [ "updateBuffer", "itemType", "itemRarity" ] });
        if(!itemType) throw Error("Requested item is not exist");
        const newItemsType: ItemsType = await this.constantsService.getItemsType(typeId);
        const newItemsRarity: ItemsRarity = await this.constantsService.getItemsRarity(rarityId);
        const itemTypeBuffer: ItemTypeBuffer = await this.itemTypeBufferRepository.save({ ...itemType.updateBuffer, name: itemType.name, maxCount, itemType: newItemsType, currentVersion: itemType, itemRarity: newItemsRarity });
        return this.itemTypeRepository.save({...itemType, updateBuffer: itemTypeBuffer });
    }
}
