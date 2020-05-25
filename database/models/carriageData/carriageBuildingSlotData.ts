import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { BuildingType } from "../сonstantsData";
import { CarriageData } from "./carriageData";

@Entity("CarriageBuildingSlot")
export class CarriageBuildingSlot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  buildingSize: number;

  @ManyToOne(type => BuildingType, { onDelete: "SET NULL" })
  buildingType: BuildingType;

  @ManyToOne(type => CarriageData, carriageData => carriageData.buildingSlots, { onDelete: "CASCADE" })
  carriageData: CarriageData;
}