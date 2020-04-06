export interface UpgradeItem {
    count: number;
    level: number;
    item: {
        id: number;
    }
}

export interface BuildingSlot {
    level: number;
    buildingType: {
        id: number;
    }
}