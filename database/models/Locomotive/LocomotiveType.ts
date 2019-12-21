import {Entity, OneToMany, Column, OneToOne } from "typeorm";
import {BaseTypeEntity} from "../_BaseEntities/BaseTypeEntity";
import LocomotiveTypeUpgrade from "./LocomotiveTypeUpgrade";
import LocomotiveTypeBuffer from "./LocomotiveTypeBuffer";

@Entity('LocomotiveTypes')
export default class LocomotiveType extends BaseTypeEntity {
    @Column()
    inRotation: boolean;

    @OneToMany(type => LocomotiveTypeUpgrade, upgrade => upgrade.locomotiveType, { cascade: true })
    upgradesRecipes: LocomotiveTypeUpgrade[];

    @OneToOne(type => LocomotiveTypeBuffer, buffer => buffer.currentVersion, { cascade: true })
    updateBuffer: LocomotiveTypeBuffer;
}