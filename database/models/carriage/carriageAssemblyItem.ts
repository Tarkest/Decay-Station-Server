import { BaseUpgradeItemEntity } from "../baseEntities";
import { Entity, ManyToOne } from "typeorm";
import { CarriageData } from "./carriageData";
import { ItemData } from "../item";

@Entity("CarriageAssemblyItem")
export class CarriageAssemblyItem extends BaseUpgradeItemEntity {

  @ManyToOne(type => ItemData, { onDelete: "SET NULL" })
  item: ItemData;

  @ManyToOne(type => CarriageData, carType => carType.assemblyItems, { onDelete: "CASCADE" })
  carriageData: CarriageData;
}