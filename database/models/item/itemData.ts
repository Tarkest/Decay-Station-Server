import { Column, Entity, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { ItemsType, ItemsRarity } from "../сonstants";
import { ItemDataBuffer } from "./itemDataBuffer";
import { LocomotiveDataUpgrade, LocomotiveDataUpgradeBuffer } from "../locomotive";
import { CarriageAssemblyItem, CarriagesAssemblyItemBuffer } from "../carriage";

@Entity("ItemData")
export class ItemData extends BaseIdNameEntity {
    @Column()
    inRotation: boolean;

    @Column()
    maxCount: number;

    @ManyToOne(type => ItemsType, itemsType => itemsType.items, { onDelete: "SET NULL" })
    type: ItemsType;

    @ManyToOne(type => ItemsRarity, itemsRarity => itemsRarity.items, { onDelete: "SET NULL" })
    rarity: ItemsRarity;

    @OneToOne(type => ItemDataBuffer, buffer => buffer.currentVersion, { onDelete: "SET NULL" })
    @JoinColumn()
    updateBuffer: ItemDataBuffer;

    @OneToMany(type => LocomotiveDataUpgrade, locomotiveUpgrade => locomotiveUpgrade.item, { onDelete: "SET NULL"})
    locomotiveUpgrades: LocomotiveDataUpgrade;

    @OneToMany(type => LocomotiveDataUpgradeBuffer, locomotiveUpgradeBuffer => locomotiveUpgradeBuffer.item, { onDelete: "SET NULL"})
    locomotiveUpgradesBuffer: LocomotiveDataUpgradeBuffer;

    @OneToMany(type => CarriageAssemblyItem, carriageAssemblyItem => carriageAssemblyItem.item, { onDelete: "SET NULL"})
    carriageAssemblyItems: CarriageAssemblyItem;

    @OneToMany(type => CarriagesAssemblyItemBuffer, carriagesAssemblyItemBuffer => carriagesAssemblyItemBuffer.item, { onDelete: "SET NULL"})
    carriagesAssemblyItemsBuffer: CarriagesAssemblyItemBuffer;
}