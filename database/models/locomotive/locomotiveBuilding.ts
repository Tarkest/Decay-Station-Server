import { BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn, Entity } from "typeorm";
import { Locomotive } from "./locomotive";
import { Building } from "../buildings/building";

@Entity()
export class LocomotiveBuilding extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  index: number;

  @ManyToOne(type => Building, buildingData => buildingData.locomotiveBuilding, { onDelete: "SET NULL" })
  @JoinColumn()
  currentBuilding: Building;

  @ManyToOne(type => Locomotive, locomotive => locomotive.buildings, { onDelete: "SET NULL" })
  @JoinColumn()
  locomotive: Locomotive;
}