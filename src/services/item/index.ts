import {Item} from "../../../database/models/Item";
import {inventoryName} from '../../constants'

export default class ItemService {
    getItems(relationKey: inventoryName, relationId) {
        return Item.find({[relationKey]: relationId})
    }

    async replaceItem(from, to) {
        const itemFrom = await Item.findOne({where: {cellId: from}});
        const itemTo = await Item.findOne({where: {cellId: to}});
        if (itemTo) {
            const updatedToItem = await Item.update({id: itemTo.id}, {...itemTo, cellId: itemFrom.cellId});
            console.log(updatedToItem);
        }
        const fromItemUpdated = await Item.update({id: itemFrom.id}, {...itemFrom, cellId: to});
        console.log(fromItemUpdated);
        return {success: true}
    }
}
