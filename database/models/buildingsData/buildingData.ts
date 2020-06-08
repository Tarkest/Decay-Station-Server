import { Entity, Column, ManyToOne, ManyToMany, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { BuildingType } from "../сonstantsData";
// import { RecipeData } from "../../models/recipesData";
import { BuildingDataBuffer } from "./buildingDataBuffer";
import { CarriageBuilding } from "../carriage/carriageBuilding";

@Entity()
export class BuildingData extends BaseIdNameEntity {
  @Column()
  size: number;

  @ManyToOne(type => BuildingType, { onDelete: "SET NULL" })
  type: BuildingType;

  // @ManyToMany(type => RecipeData)
  // @JoinTable({ name: "RecipesToBuildings" })
  // recipes: RecipeData[];

  @OneToMany(type => CarriageBuilding, building => building.currentBuilding, { onDelete: "SET NULL" })
  carriagesBuildings: CarriageBuilding[];

  @OneToOne(type => BuildingDataBuffer, buffer => buffer.currentVersion, { onDelete: "SET NULL" })
  @JoinColumn()
  updateBuffer: BuildingDataBuffer;
}