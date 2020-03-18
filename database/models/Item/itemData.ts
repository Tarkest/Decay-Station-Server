import { Column, Entity, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseIdNameEntity } from "../_BaseEntities/BaseIdNameEntity";
import { ItemsType, ItemsRarity } from "../Constants";
import { ItemDataBuffer } from "./itemDataBuffer";
import { LocomotiveDataUpgrade } from "../Locomotive/locomotiveUpgradeData";
import { LocomotiveDataUpgradeBuffer } from "../Locomotive/locomotiveUpgradeDataBuffer";

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
}