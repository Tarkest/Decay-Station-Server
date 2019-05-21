import {TrainBuilding} from "../../database/models/TrainBuilding";

export const splitBuildings = (buildingsArray: Array<TrainBuilding>) => ({
    outer: buildingsArray.filter(it => it.isOuter === true),
    inner: buildingsArray.filter(it => it.isOuter === false)
});
