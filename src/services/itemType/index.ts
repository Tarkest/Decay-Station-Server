import { getRepository, Repository } from "typeorm";
import ItemType from "../../../database/models/Item/ItemType";
import ItemTypeBuffer from "../../../database/models/Item/ItemTypeBuffer";
import { ItemsType } from "../../../database/models/Constants";
import ConstatntsService from "../constants";

export default class ItemTypeService {
    //Repositories
    private itemTypeRepository: Repository<ItemType> = getRepository(ItemType);
    private itemTypeBufferRepository: Repository<ItemTypeBuffer> = getRepository(ItemTypeBuffer);

    //Services
    private constantsService: ConstatntsService = new ConstatntsService();

    public async createItemType(name: string, maxCount: number, appearenceVersion: string, typeId: number): Promise<ItemType> {
        const checkType: ItemType = await this.itemTypeRepository.findOne({ where: { name } });
        if(checkType) throw Error("There is item with this name");
        const currentType: ItemsType = await this.constantsService.getItemsType(typeId);
        return this.itemTypeRepository.save({ name, maxCount, appearenceVersion, itemType: currentType });
    }

    public async getItemsTypes(): Promise<ItemType[]> {
        return this.itemTypeRepository.find({ relations: [ "updateBuffer" ] });
    }

    public async saveUpdateForItemType(id: number, maxCount: number, appearenceVersion: string, typeId: number): Promise<ItemType> {
        let itemType: ItemType = await this.itemTypeRepository.findOne({ where:{ id }, relations: [ "updateBuffer" ] });
        if(!itemType) throw Error("Requested item is not exist");
        const newItemsType: ItemsType = await this.constantsService.getItemsType(typeId);
        const itemTypeBuffer: ItemTypeBuffer = await this.itemTypeBufferRepository.save({ ...itemType.updateBuffer, name: ItemType.name, maxCount, appearenceVersion, itemType: newItemsType, currentVersion: itemType });
        return this.itemTypeRepository.save({...itemType, updateBuffer: itemTypeBuffer });
    }
}
