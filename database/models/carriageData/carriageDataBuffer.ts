import { Column, Entity, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { BaseIdNameEntity } from "../../models/baseEntities";
import { CarriageAssemblyItemBuffer } from "./carriageAssemblyItemBuffer";
import { CarriageBuildingSlotBuffer } from "./carriageBuildingSlotBufferData";
import { CarriageData } from "./carriageData";

@Entity()
export class CarriageDataBuffer extends BaseIdNameEntity {
  @Column()
  storageCapacity: number;

  @Column()
  crewCapacity: number;

  @OneToMany(type => CarriageAssemblyItemBuffer, item => item.carriageData, { onDelete: "CASCADE" })
  assemblyItems: CarriageAssemblyItemBuffer[];

  @OneToMany(type => CarriageBuildingSlotBuffer, slot => slot.carriageData, { onDelete: "CASCADE" })
  buildingSlots: CarriageBuildingSlotBuffer[];

  @OneToOne(type => CarriageData, current => current.updateBuffer, { onDelete: "CASCADE" })
  @JoinColumn()
  currentVersion: CarriageData;
}
