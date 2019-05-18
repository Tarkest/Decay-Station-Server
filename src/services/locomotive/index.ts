import {getRepository} from "typeorm";
import {Locomotive, LocomotiveType} from "../../../database/models/Locomotive";
import {inventoryName} from "../../constants";
import ItemService from "../item";


export default class LocomotiveService {
    repository = getRepository(Locomotive);
    async createLocomotive({name, typeId}, userId) {
        const type = await LocomotiveType.findOne({id: typeId});
        if(type){
            return this.repository.save({name:'test', type, userId})
        }else{
            throw new Error('Type does not exist')
        }
    }

    async getItems(id) {
        return new ItemService().getItems(inventoryName.locomotive, id);
    }

    async getUserCarriages(userId) {
        return this.repository.find({userId})
    }
}
