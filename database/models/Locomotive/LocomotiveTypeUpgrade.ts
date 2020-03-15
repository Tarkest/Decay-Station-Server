import BaseUpgradeItemEntity from "../_BaseEntities/BaseUpgradeItemEntity";
import {Entity, Column, ManyToOne} from "typeorm";
import { LocomotiveType } from "./LocomotiveType";
import { ItemType } from "../Item/ItemType";

@Entity("LocomotivesUpgrades")
export class LocomotiveTypeUpgrade extends BaseUpgradeItemEntity {
    @Column()
    level: number;

    @ManyToOne(type => ItemType, { onDelete: "SET NULL" })
    item: ItemType;

    @ManyToOne(type => LocomotiveType, locoType => locoType.upgradesRecipes, { onDelete: "CASCADE" })
    locomotiveType: LocomotiveType;
}