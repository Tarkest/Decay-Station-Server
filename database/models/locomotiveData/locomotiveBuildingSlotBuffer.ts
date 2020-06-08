import {Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity} from "typeorm";
import { LocomotiveDataBuffer } from "./locomotiveDataBuffer";
import { BuildingType } from "../сonstantsData";

@Entity()
export class LocomotiveBuildingSlotBuffer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: number;

  @Column()
  index: number;

  @ManyToOne(type => BuildingType, typeData => typeData.locomotiveSlotsBuffers, { onDelete: "SET NULL" })
  buildingType: BuildingType;

  @ManyToOne(type => LocomotiveDataBuffer, locomotiveData => locomotiveData.buildingSlots, { onDelete: "CASCADE" })
  locomotiveData: LocomotiveDataBuffer;
}