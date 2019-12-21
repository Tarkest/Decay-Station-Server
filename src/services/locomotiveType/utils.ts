import LocomotiveType from "../../../database/models/Locomotive/LocomotiveType";
import LocomotiveTypeUpgrade from "../../../database/models/Locomotive/LocomotiveTypeUpgrade";

export const locomotiveTypeDTO = (locomotiveType: LocomotiveType) => {
    let upgradesBuffer = [];
    for (let level = 0; level < 5; level++) {  
        upgradesBuffer[level] =  {
            items: locomotiveType.upgradesRecipes
            .filter((item: LocomotiveTypeUpgrade) => item.level === level)
            .map((item: LocomotiveTypeUpgrade) => { return { id: item.id, itemId: item, count: item.count } })
        };
    }
    return { ...locomotiveType, upgradesRecipes: upgradesBuffer };
}

export const locomotiveTypeToModel = (locomotive) => {
    let upgradesBuffer = [];
    const { id, name, appearenceVersion, upgradesRecipes } = locomotive;
    for (let level = 0; level < 5; level++) {
        for (let value = 0; value < 8; value++) {
            const { id, itemId, count } = upgradesRecipes[level].items[value];
            upgradesBuffer[value + (level * 8)] = { id, itemId, count, level };
        }
    }
    return { id, name, appearenceVersion, upgradesRecipes: upgradesBuffer };
}