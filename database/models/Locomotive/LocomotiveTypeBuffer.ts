import {Entity, OneToMany, OneToOne } from "typeorm";
import {BaseTypeEntity} from "../_BaseEntities/BaseTypeEntity";
import LocomotiveType from "./LocomotiveType";
import LocomotiveTypeUpgradeBuffer from "./LocomotiveTypeUpgradeBuffer";

@Entity("LocomotiveTypeBuffer")
export default class LocomotiveTypeBuffer extends BaseTypeEntity {

    @OneToMany(type => LocomotiveTypeUpgradeBuffer, upgrade => upgrade.locomotiveType, { cascade: true })
    upgradesRecipes: LocomotiveTypeUpgradeBuffer[];

    @OneToOne(type => LocomotiveType, current => current.updateBuffer)
    currentVersion: LocomotiveType;
}