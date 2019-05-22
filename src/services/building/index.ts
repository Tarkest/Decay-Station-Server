import {TrainBuilding} from "../../../database/models/TrainBuilding";
import {TimeStamp} from "../../../database/models/TimeStamp";
import {TimeStampService} from "../timestamp";
import * as moment from "moment";

export default class BuildingService {
    getBuildings(relationKey, relationId) {
        return TrainBuilding.find({[relationKey]: relationId})
    }

    addBuilding(body, parent, parentId) {
        const building = {
            ...body,
            [`${parent}`]: parentId
        };

        return TrainBuilding.save(building);
    }

    static async addAction(id, body) {
        const building = await TrainBuilding.findOne(id)
        building.currentStamp = await TimeStampService.create({itemId: 1, itemsCapacity: 100, recipeId: 1});
        return building.save()
    }

    static async checkStatus(id) {
        const building = await TrainBuilding.findOne(id, {relations: ['currentStamp']});
        if (building.currentStamp) {
            const {endDate} = building.currentStamp;
            return {
                completed: moment(endDate) >= moment(),
                canBeSet: false
            }
        }
        return {
            completed: false,
            canBeSet: true
        }
    }
}
