import { BaseUpgradeItemEntity } from "../baseEntities";
import { Entity, Column, ManyToOne } from "typeorm";
import { LocomotiveDataBuffer } from "./locomotiveDataBuffer";
import { ItemData } from "../item";

@Entity("LocomotiveUpgradesDataBuffer")
export class LocomotiveDataUpgradeBuffer extends BaseUpgradeItemEntity {
    @Column()
    level: number;

    @ManyToOne(type => ItemData, { onDelete: "SET NULL" })
    item: ItemData;

    @ManyToOne(type => LocomotiveDataBuffer, locomotiveData => locomotiveData.upgradesRecipes, { onDelete: "CASCADE" })
    locomotiveData: LocomotiveDataBuffer;
}