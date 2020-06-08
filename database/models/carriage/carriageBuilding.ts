import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { BuildingData } from "../buildingsData/buildingData";
import { Carriage } from "./carriage";

@Entity()
export class CarriageBuilding extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  index: number;

  @ManyToOne(type => BuildingData, buildingData => buildingData.carriagesBuildings, { onDelete: "SET NULL" })
  @JoinColumn()
  currentBuilding: BuildingData;

  @ManyToOne(type => Carriage, carriage => carriage.buildings, { onDelete: "SET NULL" })
  @JoinColumn()
  carriage: Carriage;
}
