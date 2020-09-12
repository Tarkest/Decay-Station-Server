import { BaseUpgradeItemEntity } from "../../models/baseEntities";
import { Entity, ManyToOne, Column } from "typeorm";
import { CarriageDataBuffer } from "./carriageDataBuffer";
import { ItemData } from "../itemData";

@Entity()
export class CarriageAssemblyItemBuffer extends BaseUpgradeItemEntity {

  @ManyToOne(type => ItemData, { onDelete: "SET NULL" })
  item: ItemData;

  @ManyToOne(type => CarriageDataBuffer, carType => carType.assemblyItems, { onDelete: "CASCADE" })
  carriageData: CarriageDataBuffer;
}
