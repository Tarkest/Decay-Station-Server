import { Column, Entity, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { CarriageAssemblyItem } from "./carriageAssemblyItem";
import { CarriageBuildingSlot } from "./carriageBuildingSlotData";
import { CarriageDataBuffer } from "./carriageDataBuffer";
import { Carriage } from "../carriage";

@Entity()
export class CarriageData extends BaseIdNameEntity {
  @Column()
  inRotation: boolean;

  @Column()
  storageCapacity: number;

  @Column()
  crewCapacity: number;

  @OneToMany(type => CarriageAssemblyItem, item => item.carriageData, { onDelete: "CASCADE" })
  assemblyItems: CarriageAssemblyItem[];

  @OneToMany(type => CarriageBuildingSlot, slot => slot.carriageData, { onDelete: "CASCADE" })
  buildingSlots: CarriageBuildingSlot[];

  @OneToMany(type => Carriage, carriage => carriage.data, { onDelete: "SET NULL" })
  carriages: Carriage[];

  @OneToOne(type => CarriageDataBuffer, buffer => buffer.currentVersion, { onDelete: "SET NULL" })
  @JoinColumn()
  updateBuffer: CarriageDataBuffer;
}