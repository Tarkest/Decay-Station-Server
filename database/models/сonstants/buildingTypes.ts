import { Entity, OneToMany } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { LocomotiveBuildingSlot, LocomotiveBuildingSlotBuffer } from '../locomotive';

@Entity("BuildingType")
export class BuildingType extends BaseIdNameEntity {

  @OneToMany(type => LocomotiveBuildingSlot, slot => slot.buildingType)
  locomotiveSlots: LocomotiveBuildingSlot[];

  @OneToMany(type => LocomotiveBuildingSlotBuffer, slot => slot.buildingType)
  locomotiveSlotsBuffers: LocomotiveBuildingSlotBuffer[];
}