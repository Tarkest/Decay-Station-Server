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
            await Item.update({id: itemTo.id}, {...itemTo, cellId: from});
        }
        await Item.update({id: itemFrom.id}, {...itemFrom, cellId: to});
        return {success: true}
    }
}
