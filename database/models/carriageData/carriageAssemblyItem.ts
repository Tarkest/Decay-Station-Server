import { BaseUpgradeItemEntity } from "../../models/baseEntities";
import { Entity, ManyToOne, Column } from "typeorm";
import { CarriageData } from "./carriageData";
import { ItemData } from "../itemData";

@Entity()
export class CarriageAssemblyItem extends BaseUpgradeItemEntity {

  @ManyToOne(type => ItemData, { onDelete: "SET NULL" })
  item: ItemData;

  @ManyToOne(type => CarriageData, carType => carType.assemblyItems, { onDelete: "CASCADE" })
  carriageData: CarriageData;
}
