import { Column, Entity, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { BaseIdNameEntity } from "../_BaseEntities/BaseIdNameEntity";
import { ItemsType, ItemsRarity } from "../Constants";
import { ItemType } from "./ItemType";

@Entity("ItemTypeBuffer")
export class ItemTypeBuffer extends BaseIdNameEntity {
    @Column()
    maxCount: number;

    @ManyToOne(type => ItemsType, ItemsType => ItemsType.items, { onDelete: "SET NULL" })
    itemType: ItemsType;

    @ManyToOne(type => ItemsRarity, ItemsRarity => ItemsRarity.items, { onDelete: "SET NULL" })
    itemRarity: ItemsRarity;

    @OneToOne(type => ItemType, buffer => buffer.updateBuffer, { onDelete: "CASCADE" })
    @JoinColumn()
    currentVersion: ItemType;
}