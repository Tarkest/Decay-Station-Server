import { Entity, OneToMany, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseIdNameEntity } from "../_BaseEntities/BaseIdNameEntity";
import { LocomotiveDataUpgrade } from "./locomotiveUpgradeData";
import { LocomotiveDataBuffer } from "./locomotiveDataBuffer";

@Entity('LocomotiveData')
export class LocomotiveData extends BaseIdNameEntity {
    @Column()
    maxLevel: number;

    @Column()
    inRotation: boolean;

    @OneToMany(type => LocomotiveDataUpgrade, upgrade => upgrade.LocomotiveData, { onDelete: "CASCADE" })
    upgradesRecipes: LocomotiveDataUpgrade[];

    @OneToOne(type => LocomotiveDataBuffer, buffer => buffer.currentVersion, { onDelete: "SET NULL" })
    @JoinColumn()
    updateBuffer: LocomotiveDataBuffer;
}