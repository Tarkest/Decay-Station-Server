import { getRepository, Repository } from "typeorm";
import { ItemData, ItemDataBuffer } from "../../../database/models/Item";
import { ItemsType, ItemsRarity } from "../../../database/models/Constants";
import ConstatntsService from "../constants";

export default class ItemDataService {

    // Repositories
    private itemDataRepository: Repository<ItemData> = getRepository(ItemData);
    private itemDataBufferRepository: Repository<ItemDataBuffer> = getRepository(ItemDataBuffer);

    // Services
    private constantsService: ConstatntsService = new ConstatntsService();

    public async createItemData(name: string, maxCount: number, typeId: number, rarityId: number): Promise<ItemData> {
        const checkType: ItemData = await this.itemDataRepository.findOne({ where: { name } });
        if(checkType) throw Error("There is item with this name");
        const currentType: ItemsType = await this.constantsService.getItemsType(typeId);
        const currentRarity: ItemsRarity = await this.constantsService.getItemsRarity(rarityId);
        return this.itemDataRepository.save({ name, maxCount, type: currentType, rarity: currentRarity, inRotation: false });
    }

    public async getItemsData() {
        const types = await this.itemDataRepository.find({ relations: [ "updateBuffer", "type", "rarity", "updateBuffer.type", "updateBuffer.rarity" ] });
        return { items: types };
    }

    public async getItemById(id: number): Promise<ItemData> {
        return await this.itemDataRepository.findOne({ where: { id }});
    }

    public async saveUpdateForItemData(id: number, maxCount: number, typeId: number, rarityId: number): Promise<ItemData> {
        const itemData: ItemData = await this.itemDataRepository.findOne({ where:{ id }, relations: [ "updateBuffer", "type", "rarity" ] });
        if(!itemData) throw Error("Requested item is not exist");
        const newItemsType: ItemsType = await this.constantsService.getItemsType(typeId);
        const newItemsRarity: ItemsRarity = await this.constantsService.getItemsRarity(rarityId);
        const itemDataBuffer: ItemDataBuffer = await this.itemDataBufferRepository.save({ ...itemData.updateBuffer, name: itemData.name, maxCount, type: newItemsType, currentVersion: itemData, rarity: newItemsRarity });
        return this.itemDataRepository.save({ ...itemData, updateBuffer: itemDataBuffer });
    }

    public async changeRotationStatus(id: number) {
        const itemData: ItemData = await this.itemDataRepository.findOne({ where:{ id }, relations: [ "updateBuffer", "type", "rarity" ] });
        return this.itemDataRepository.save({ ...itemData, inRotation: !itemData.inRotation });
    }

    public async removeUpdate(id: number) {
        const updateBuffer: ItemDataBuffer = await this.itemDataBufferRepository.findOne({ where: { id } });
        if(!updateBuffer) throw Error("There is no incoming update already, please reload the editor");
        return this.itemDataBufferRepository.remove(updateBuffer);
    }
}

export { ItemData } from "../../../database/models/Item";