import { Entity, OneToMany, OneToOne } from "typeorm";
import { BaseIdNameEntity } from "../_BaseEntities/BaseIdNameEntity";
import LocomotiveType from "./LocomotiveType";
import LocomotiveTypeUpgradeBuffer from "./LocomotiveTypeUpgradeBuffer";

@Entity("LocomotiveTypeBuffer")
export default class LocomotiveTypeBuffer extends BaseIdNameEntity {

    @OneToMany(type => LocomotiveTypeUpgradeBuffer, upgrade => upgrade.locomotiveType, { onDelete: "SET NULL" })
    upgradesRecipes: LocomotiveTypeUpgradeBuffer[];

    @OneToOne(type => LocomotiveType, current => current.updateBuffer, { onDelete: "CASCADE" })
    currentVersion: LocomotiveType;
}