import BaseUpgradeItemEntity from "../_BaseEntities/BaseUpgradeItemEntity";
import {Entity, Column, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import LocomotiveType from "./LocomotiveType";
import { ItemType } from "../Item/ItemType";

@Entity("LocomotivesUpgrades")
export default class LocomotiveTypeUpgrade extends BaseUpgradeItemEntity {
    @Column()
    level: number;

    @OneToOne(type => ItemType, { onDelete: "SET NULL" })
    @JoinColumn()
    item: ItemType;

    @ManyToOne(type => LocomotiveType, locoType => locoType.upgradesRecipes, { onDelete: "CASCADE" })
    locomotiveType: LocomotiveType;
}