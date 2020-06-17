import { Entity, OneToMany, Column, OneToOne, JoinColumn } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { LocomotiveDataUpgrade } from "./locomotiveUpgradeData";
import { LocomotiveDataBuffer } from "./locomotiveDataBuffer";
import { LocomotiveBuildingSlot } from "./locomotiveBuildingSlot";
import { Locomotive } from "../locomotive";

@Entity()
export class LocomotiveData extends BaseIdNameEntity {
  @Column()
  maxLevel: number;

  @Column()
  inRotation: boolean;

  @OneToMany(type => LocomotiveDataUpgrade, upgrade => upgrade.locomotiveData, { onDelete: "CASCADE" })
  upgradesRecipes: LocomotiveDataUpgrade[];

  @OneToMany(type => LocomotiveBuildingSlot, slot => slot.locomotiveData, { onDelete: "CASCADE" })
  buildingSlots: LocomotiveBuildingSlot[];

  @OneToMany(type => Locomotive, locomotive => locomotive.data, { onDelete: "SET NULL" })
  locomotives: Locomotive;

  @OneToOne(type => LocomotiveDataBuffer, buffer => buffer.currentVersion, { onDelete: "SET NULL" })
  @JoinColumn()
  updateBuffer: LocomotiveDataBuffer;
}