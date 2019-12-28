import { Entity, OneToMany, Column, OneToOne } from "typeorm";
import { BaseIdNameEntity } from "../_BaseEntities/BaseIdNameEntity";
import LocomotiveTypeUpgrade from "./LocomotiveTypeUpgrade";
import LocomotiveTypeBuffer from "./LocomotiveTypeBuffer";

@Entity('LocomotiveTypes')
export default class LocomotiveType extends BaseIdNameEntity {
    @Column()
    inRotation: boolean;

    @OneToMany(type => LocomotiveTypeUpgrade, upgrade => upgrade.locomotiveType, { onDelete: "SET NULL" })
    upgradesRecipes: LocomotiveTypeUpgrade[];

    @OneToOne(type => LocomotiveTypeBuffer, buffer => buffer.currentVersion, { onDelete: "SET NULL" })
    updateBuffer: LocomotiveTypeBuffer;
}