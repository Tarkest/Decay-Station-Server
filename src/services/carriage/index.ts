import {CarriageRepository} from '../../repositories/carriage'
import {getCustomRepository} from "typeorm";
import {CarriageType} from "../../../database/models/Carriage";
import ItemService from "../item";
import {inventoryName} from '../../constants'


export default class CarriageService {
    repository = getCustomRepository(CarriageRepository);

    async createCarriage({name, typeId}, userId) {
        const type = await CarriageType.findOne({id: typeId});
        if (type) {
            return this.repository.save({name: 'test', type, userId})
        } else {
            throw new Error('Type does not exist')
        }
    }

    async getItems(id) {
        return new ItemService().getItems(inventoryName.carriage, id);
    }

    async getUserCarriages(userId) {
        return this.repository.find({userId})
    }
}
