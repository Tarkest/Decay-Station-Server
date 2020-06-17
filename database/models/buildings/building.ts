import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn , OneToOne } from "typeorm";
import { BuildingData } from "../buildingsData";
import { CarriageBuilding } from "../carriage/carriageBuilding";
import { LocomotiveBuilding } from "../locomotive/locomotiveBuilding";

@Entity()
export class Building extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => BuildingData, buildingData => buildingData.currentBuildings, { onDelete: "SET NULL" })
  @JoinColumn()
  buildingData: BuildingData;

  @OneToOne(type => CarriageBuilding, carriageBuilding => carriageBuilding.currentBuilding, { onDelete: "CASCADE" })
  carriageBuilding: CarriageBuilding;

  @OneToOne(type => LocomotiveBuilding, locomotiveBuilding => locomotiveBuilding.currentBuilding, { onDelete: "CASCADE" })
  locomotiveBuilding: LocomotiveBuilding;
}
