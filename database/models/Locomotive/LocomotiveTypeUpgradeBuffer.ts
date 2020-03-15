import BaseUpgradeItemEntity from "../_BaseEntities/BaseUpgradeItemEntity";
import { Entity, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { LocomotiveTypeBuffer } from "./LocomotiveTypeBuffer";
import { ItemType } from "../Item/ItemType";

@Entity("LocomotiveTypeUpgradeBuffer")
export class LocomotiveTypeUpgradeBuffer extends BaseUpgradeItemEntity {
    @Column()
    level: number;

    @ManyToOne(type => ItemType, { onDelete: "SET NULL" })
    item: ItemType;

    @ManyToOne(type => LocomotiveTypeBuffer, locoType => locoType.upgradesRecipes, { onDelete: "CASCADE" })
    locomotiveType: LocomotiveTypeBuffer;
}