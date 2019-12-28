import { Column, Entity, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { BaseIdNameEntity } from "../_BaseEntities/BaseIdNameEntity";
import { ItemsType } from "../Constants/ItemsTypes";
import { ItemsRarity } from "../Constants/ItemsRarity";
import { ItemTypeBuffer } from "./ItemTypeBuffer";

@Entity("ItemType")
export class ItemType extends BaseIdNameEntity {
    @Column()
    maxCount: number;

    @ManyToOne(type => ItemsType, ItemsType => ItemsType.items, { onDelete: "SET NULL" })
    itemType: ItemsType;

    @ManyToOne(type => ItemsRarity, ItemsRarity => ItemsRarity.items, { onDelete: "SET NULL" })
    itemRarity: ItemsRarity;

    @OneToOne(type => ItemTypeBuffer, buffer => buffer.currentVersion, { onDelete: "SET NULL" })
    @JoinColumn()
    updateBuffer: ItemTypeBuffer;
}