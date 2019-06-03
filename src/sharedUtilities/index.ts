import {TrainBuilding} from "../../database/models/TrainBuilding";

export const splitBuildings = (buildingsArray: TrainBuilding[]) => ({
    inner: buildingsArray.filter(it => it.isOuter === false),
    outer: buildingsArray.filter(it => it.isOuter === true),
});
