import { Entity, Column, ManyToOne, ManyToMany, OneToOne, JoinColumn, OneToMany, JoinTable } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { BuildingType } from "../сonstantsData";
import { RecipeData } from "../../models/recipesData";
import { BuildingDataBuffer } from "./buildingDataBuffer";
import { Building } from "../buildings/building";

@Entity()
export class BuildingData extends BaseIdNameEntity {

  @Column()
  size: number;

  @ManyToOne(type => BuildingType, { onDelete: "SET NULL" })
  type: BuildingType;

  @ManyToMany(type => RecipeData)
  @JoinTable()
  recipes: RecipeData[];

  @OneToMany(type => Building, building => building.buildingData, { onDelete: "SET NULL" })
  currentBuildings: Building[];

  @OneToOne(type => BuildingDataBuffer, buffer => buffer.currentVersion, { onDelete: "SET NULL" })
  @JoinColumn()
  updateBuffer: BuildingDataBuffer;
}
