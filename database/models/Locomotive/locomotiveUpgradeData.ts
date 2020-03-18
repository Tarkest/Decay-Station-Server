import BaseUpgradeItemEntity from "../_BaseEntities/BaseUpgradeItemEntity";
import {Entity, Column, ManyToOne} from "typeorm";
import { LocomotiveData } from "./locomotiveData";
import { ItemData } from "../Item/itemData";

@Entity("LocomotivesUpgradesData")
export class LocomotiveDataUpgrade extends BaseUpgradeItemEntity {
    @Column()
    level: number;

    @ManyToOne(type => ItemData, { onDelete: "SET NULL" })
    item: ItemData;

    @ManyToOne(type => LocomotiveData, locomotiveType => locomotiveType.upgradesRecipes, { onDelete: "CASCADE" })
    LocomotiveData: LocomotiveData;
}