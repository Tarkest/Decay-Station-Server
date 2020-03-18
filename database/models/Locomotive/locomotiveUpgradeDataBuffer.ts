import BaseUpgradeItemEntity from "../_BaseEntities/BaseUpgradeItemEntity";
import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { LocomotiveDataBuffer } from "./locomotiveDataBuffer";
import { ItemData } from "../Item/itemData";

@Entity("LocomotiveDataUpgradeBuffer")
export class LocomotiveDataUpgradeBuffer extends BaseUpgradeItemEntity {
    @Column()
    level: number;

    @ManyToOne(type => ItemData, { onDelete: "SET NULL" })
    item: ItemData;

    @ManyToOne(type => LocomotiveDataBuffer, locoType => locoType.upgradesRecipes, { onDelete: "CASCADE" })
    LocomotiveData: LocomotiveDataBuffer;
}