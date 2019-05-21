import {getRepository} from "typeorm";
import {Locomotive, LocomotiveType} from "../../../database/models/Locomotive";
import {inventoryName} from "../../constants";
import ItemService from "../item";
import BuildingService from "../building";
import {splitBuildings} from '../../sharedUtilities'


export default class LocomotiveService {
    repository = getRepository(Locomotive);

    async createLocomotive({name, typeId}, userId) {
        const type = await LocomotiveType.findOne({id: typeId});
        if (type) {
            return this.repository.save({name: 'test', type, userId})
        } else {
            throw new Error('Type does not exist')
        }
    }

    async getItems(id) {
        return new ItemService().getItems(inventoryName.locomotive, id);
    }

    async getUserCarriages(userId) {
        return this.repository.find({userId})
    }

    async levelup(userId) {
        const locomotive = await this.repository.findOne({where: {userId}});
        const checkRequirements = true;
        if (checkRequirements) {
            return this.repository.update({id: locomotive.id}, {level: locomotive.level + 1})
        } else {
            throw new Error('Requirements are not met')
        }
    }

    async update(body, id) {
        const {name} = body;
        return this.repository.update({id: id}, {name})
    }

    async getLocomotiveBuildings(id) {
        const buildings = await new BuildingService().getBuildings('locomotive', id);
        return splitBuildings(buildings);
    }
}
