import { Column, Entity, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseIdNameEntity } from "../_BaseEntities/BaseIdNameEntity";
import { ItemsType, ItemsRarity } from "../Constants";
import { ItemTypeBuffer } from "./ItemTypeBuffer";
import { LocomotiveTypeUpgrade } from "../Locomotive/LocomotiveTypeUpgrade";
import { LocomotiveTypeUpgradeBuffer } from "../Locomotive/LocomotiveTypeUpgradeBuffer";

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

    @OneToMany(type => LocomotiveTypeUpgrade, locomotiveUpgrade => locomotiveUpgrade.item, { onDelete: "SET NULL"})
    locomotiveUpgrades: LocomotiveTypeUpgrade;

    @OneToMany(type => LocomotiveTypeUpgradeBuffer, locomotiveUpgradeBuffer => locomotiveUpgradeBuffer.item, { onDelete: "SET NULL"})
    locomotiveUpgradesBuffer: LocomotiveTypeUpgradeBuffer;
}