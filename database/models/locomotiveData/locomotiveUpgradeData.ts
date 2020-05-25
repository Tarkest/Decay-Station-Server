import { BaseUpgradeItemEntity } from "../baseEntities";
import {Entity, Column, ManyToOne} from "typeorm";
import { LocomotiveData } from "./locomotiveData";
import { ItemData } from "../itemData";

@Entity("LocomotivesUpgradesData")
export class LocomotiveDataUpgrade extends BaseUpgradeItemEntity {
  @Column()
  level: number;

  @ManyToOne(type => ItemData, { onDelete: "SET NULL" })
  item: ItemData;

  @ManyToOne(type => LocomotiveData, locomotiveData => locomotiveData.upgradesRecipes, { onDelete: "CASCADE" })
  locomotiveData: LocomotiveData;
}