import {getRepository} from "typeorm";
import {Locomotive, LocomotiveType} from "../../../database/models/Locomotive";
import {inventoryName} from "../../constants";
import ItemService from "../item";
import BuildingService from "../building";
import {splitBuildings} from '../../sharedUtilities';

export default class LocomotiveService {
    private repository = getRepository(Locomotive);

    public async createLocomotive({name, typeId}, userId) {
        const type = await LocomotiveType.findOne({id: typeId});
        if (type) {
            return this.repository.save({name: 'test', type, userId});
        } else {
            throw new Error('Type does not exist');
        }
    }

    public async getItems(id) {
        return ItemService.getItems(inventoryName.locomotive, id);
    }

    public async getUserCarriages(userId) {
        return this.repository.find({userId});
    }

    public async levelup(userId) {
        const locomotive = await this.repository.findOne({where: {userId}});
        const checkRequirements = true;
        if (checkRequirements) {
            return this.repository.update({id: locomotive.id}, {level: locomotive.level + 1});
        } else {
            throw new Error('Requirements are not met');
        }
    }

    public async update(body, id) {
        const {name} = body;
        const locomotive = await this.repository.findOne(id);
        locomotive.name = name;
        return this.repository.save(locomotive);
    }

    public async getLocomotiveBuildings(id) {
        const buildings = await BuildingService.getBuildings('locomotive', id);
        return splitBuildings(buildings);
    }
}
