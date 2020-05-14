import { Entity, Column, ManyToOne, ManyToMany, OneToOne, JoinColumn, JoinTable } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { BuildingType } from "../сonstants";
import { RecipeData } from "../recipes";
import { BuildingData } from "./buildingData";

@Entity("BuildingDataBuffer")
export class BuildingDataBuffer extends BaseIdNameEntity {
  @Column()
  size: number;

  @ManyToOne(type => BuildingType, { onDelete: "SET NULL" })
  type: BuildingType;

  @ManyToMany(type => RecipeData)
  @JoinTable({ name: "RecipesToBuildingsBuffers" })
  recipes: RecipeData[];

  @OneToOne(type => BuildingData, buildingData => buildingData.updateBuffer, { onDelete: "CASCADE" })
  @JoinColumn()
  currentVersion: BuildingData;
}