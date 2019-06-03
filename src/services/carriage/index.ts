import {getCustomRepository} from "typeorm";
import {CarriageType} from "../../../database/models/Carriage";
import {CarriageRepository} from '../../repositories/carriage';
import {inventoryName} from '../../constants';
import ItemService from "../item";

export default class CarriageService {
    private repository = getCustomRepository(CarriageRepository);

    public async createCarriage({name, typeId}, userId) {
        const type = await CarriageType.findOne({id: typeId});
        if (type) {
            const order = await this.repository.getMaxOrder(userId);
            return this.repository.save({name, type, userId, order: order[0].max + 1});
        } else {
            throw new Error('Type does not exist');
        }
    }

    public async getItems(id) {
        return ItemService.getItems(inventoryName.carriage, id);
    }

    public async getUserCarriages(userId) {
        return this.repository.find({userId});
    }
}
