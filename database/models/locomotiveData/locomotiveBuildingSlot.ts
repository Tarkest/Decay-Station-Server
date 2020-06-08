import { BaseEntity, Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LocomotiveData } from "./locomotiveData";
import { BuildingType } from "../сonstantsData";

@Entity()
export class LocomotiveBuildingSlot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: number;

  @Column()
  index: number;

  @ManyToOne(type => BuildingType, typeData => typeData.locomotiveSlots, { onDelete: "SET NULL" })
  buildingType: BuildingType;

  @ManyToOne(type => LocomotiveData, locomotiveData => locomotiveData.buildingSlots, { onDelete: "CASCADE" })
  locomotiveData: LocomotiveData;
}