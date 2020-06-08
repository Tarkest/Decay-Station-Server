import { Entity, OneToMany, OneToOne, JoinColumn, Column } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { LocomotiveData } from "./locomotiveData";
import { LocomotiveDataUpgradeBuffer } from "./locomotiveUpgradeDataBuffer";
import { LocomotiveBuildingSlotBuffer } from "./locomotiveBuildingSlotBuffer"

@Entity()
export class LocomotiveDataBuffer extends BaseIdNameEntity {
  @Column()
  maxLevel: number;

  @OneToMany(type => LocomotiveDataUpgradeBuffer, upgrade => upgrade.locomotiveData, { onDelete: "CASCADE" })
  upgradesRecipes: LocomotiveDataUpgradeBuffer[];

  @OneToMany(type => LocomotiveBuildingSlotBuffer, slot => slot.locomotiveData, { onDelete: "CASCADE" })
  buildingSlots: LocomotiveBuildingSlotBuffer[];

  @OneToOne(type => LocomotiveData, current => current.updateBuffer, { onDelete: "CASCADE" })
  @JoinColumn()
  currentVersion: LocomotiveData;
}