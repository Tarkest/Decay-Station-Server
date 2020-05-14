export interface IUpgradeItem {
    count: number;
    level: number;
    item: {
        id: number;
    }
}

export interface ILocomotiveBuildingSlot {
    level: number;
    buildingType: {
        id: number;
    }
}

export interface IAssemablyItem {
    count: number;
    item: {
        id: number;
    }
}

export interface ICarriageBuildingSlot {
    buildingSize: number;
    buildingType: {
        id: number;
    }
}

export interface IRecipeIngredient {
    count: number;
    item: {
        id: number;
    }
}

export interface IRecipeResult extends IRecipeIngredient {
    dropChance: number;
}