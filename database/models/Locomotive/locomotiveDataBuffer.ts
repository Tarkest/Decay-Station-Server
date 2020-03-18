import { Entity, OneToMany, OneToOne, JoinColumn, Column } from "typeorm";
import { BaseIdNameEntity } from "../_BaseEntities/BaseIdNameEntity";
import { LocomotiveData } from "./locomotiveData";
import { LocomotiveDataUpgradeBuffer } from "./locomotiveUpgradeDataBuffer";

@Entity("LocomotiveDataBuffer")
export class LocomotiveDataBuffer extends BaseIdNameEntity {
    @Column()
    maxLevel: number;

    @OneToMany(type => LocomotiveDataUpgradeBuffer, upgrade => upgrade.LocomotiveData, { onDelete: "CASCADE" })
    upgradesRecipes: LocomotiveDataUpgradeBuffer[];

    @OneToOne(type => LocomotiveData, current => current.updateBuffer, { onDelete: "CASCADE" })
    @JoinColumn()
    currentVersion: LocomotiveData;
}