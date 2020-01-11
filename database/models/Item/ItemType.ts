import { Column, Entity, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { BaseIdNameEntity } from "../_BaseEntities/BaseIdNameEntity";
import { ItemsType, ItemsRarity } from "../Constants";
import { ItemTypeBuffer } from "./ItemTypeBuffer";

@Entity("ItemType")
export class ItemType extends BaseIdNameEntity {
    @Column()
    inRotation: boolean;

    @Column()
    maxCount: number;

    @ManyToOne(type => ItemsType, ItemsType => ItemsType.items, { onDelete: "SET NULL" })
    type: ItemsType;

    @ManyToOne(type => ItemsRarity, ItemsRarity => ItemsRarity.items, { onDelete: "SET NULL" })
    rarity: ItemsRarity;

    @OneToOne(type => ItemTypeBuffer, buffer => buffer.currentVersion, { onDelete: "SET NULL" })
    @JoinColumn()
    updateBuffer: ItemTypeBuffer;
}