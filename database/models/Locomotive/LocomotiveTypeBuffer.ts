import { Entity, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { BaseIdNameEntity } from "../_BaseEntities/BaseIdNameEntity";
import { LocomotiveType } from "./LocomotiveType";
import { LocomotiveTypeUpgradeBuffer } from "./LocomotiveTypeUpgradeBuffer";

@Entity("LocomotiveTypeBuffer")
export class LocomotiveTypeBuffer extends BaseIdNameEntity {

    @OneToMany(type => LocomotiveTypeUpgradeBuffer, upgrade => upgrade.locomotiveType, { onDelete: "CASCADE" })
    upgradesRecipes: LocomotiveTypeUpgradeBuffer[];

    @OneToOne(type => LocomotiveType, current => current.updateBuffer, { onDelete: "CASCADE" })
    @JoinColumn()
    currentVersion: LocomotiveType;
}