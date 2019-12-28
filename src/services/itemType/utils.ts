import { ItemType } from "../../../database/models/Item";

export const itemTypeDTO = (itemData: ItemType) => {
    if(itemData.updateBuffer) {
        const { id } = itemData;
        const { itemRarity, itemType, maxCount, name } = itemData.updateBuffer;
        return { id, name, maxCount, itemRarity, itemType };
    } else {
        const {id, itemRarity, itemType, maxCount, name } = itemData;
        return { id, name, maxCount, itemRarity, itemType };
    }
}