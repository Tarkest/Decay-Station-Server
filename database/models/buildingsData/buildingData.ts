import { Entity, Column, ManyToOne, ManyToMany, OneToOne, JoinColumn, JoinTable } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { BuildingType } from "../сonstantsData";
import { RecipeData } from "../recipesData";
import { BuildingDataBuffer } from "./buildingDataBuffer";

@Entity("BuildingData")
export class BuildingData extends BaseIdNameEntity {
  @Column()
  size: number;

  @ManyToOne(type => BuildingType, { onDelete: "SET NULL" })
  type: BuildingType;

  @ManyToMany(type => RecipeData)
  @JoinTable({ name: "RecipesToBuildings" })
  recipes: RecipeData[];

  @OneToOne(type => BuildingDataBuffer, buffer => buffer.currentVersion, { onDelete: "SET NULL" })
  @JoinColumn()
  updateBuffer: BuildingDataBuffer;
}