import {TrainBuilding} from "../../../database/models/TrainBuilding";

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
}
