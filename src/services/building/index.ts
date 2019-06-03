import * as moment from "moment";
import {TrainBuilding} from "../../../database/models/TrainBuilding";
import {TimeStampService} from "../timestamp";

export default class BuildingService {
    public static getBuildings(relationKey, relationId) {
        return TrainBuilding.find({[relationKey]: relationId});
    }

    public static addBuilding(body, parent, parentId) {
        const building = {
            ...body,
            [`${parent}`]: parentId,
        };

        return TrainBuilding.save(building);
    }

    public static async addAction(id, body) {
        const {itemId, itemsCapacity, recipeId} = body;
        const building = await TrainBuilding.findOne(id);
        building.currentStamp = await TimeStampService.create({itemId, itemsCapacity, recipeId});
        return building.save();
    }

    public static async checkStatus(id) {
        const building = await TrainBuilding.findOne(id, {relations: ['currentStamp']});
        if (building.currentStamp) {
            const {endDate} = building.currentStamp;
            return {
                canBeSet: false,
                completed: moment(endDate) >= moment(),
            };
        }
        return {
            canBeSet: true,
            completed: false,
        };
    }
}
