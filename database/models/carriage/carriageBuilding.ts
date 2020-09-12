import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Building } from "../buildings/building";
import { Carriage } from "./carriage";

@Entity()
export class CarriageBuilding extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  index: number;

  @ManyToOne(type => Building, buildingData => buildingData.carriageBuilding, { onDelete: "SET NULL" })
  @JoinColumn()
  currentBuilding: Building;

  @ManyToOne(type => Carriage, carriage => carriage.buildings, { onDelete: "SET NULL" })
  @JoinColumn()
  carriage: Carriage;
}
