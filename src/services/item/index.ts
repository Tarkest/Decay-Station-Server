import {Item} from "../../../database/models/Item";

export default class ItemService {
    getItems(relationKey, relationId) {
        return Item.find({[relationKey]: relationId})
    }
}
