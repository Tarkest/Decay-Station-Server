import { Entity, OneToMany, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseIdNameEntity } from "../_BaseEntities/BaseIdNameEntity";
import { LocomotiveTypeUpgrade } from "./LocomotiveTypeUpgrade";
import { LocomotiveTypeBuffer } from "./LocomotiveTypeBuffer";

@Entity('LocomotiveTypes')
export class LocomotiveType extends BaseIdNameEntity {
    @Column()
    inRotation: boolean;

    @OneToMany(type => LocomotiveTypeUpgrade, upgrade => upgrade.locomotiveType, { onDelete: "CASCADE" })
    upgradesRecipes: LocomotiveTypeUpgrade[];

    @OneToOne(type => LocomotiveTypeBuffer, buffer => buffer.currentVersion, { onDelete: "SET NULL" })
    @JoinColumn()
    updateBuffer: LocomotiveTypeBuffer;
}