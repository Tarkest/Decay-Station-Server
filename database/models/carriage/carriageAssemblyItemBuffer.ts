import { BaseUpgradeItemEntity } from "../baseEntities";
import { Entity, ManyToOne } from "typeorm";
import { CarriageDataBuffer } from "./carriageDataBuffer";
import { ItemData } from "../item";

@Entity("CarriageAssemblyItemBufferData")
export class CarriageAssemblyItemBuffer extends BaseUpgradeItemEntity {

  @ManyToOne(type => ItemData, { onDelete: "SET NULL" })
  item: ItemData;

  @ManyToOne(type => CarriageDataBuffer, carType => carType.assemblyItems, { onDelete: "CASCADE" })
  carriageData: CarriageDataBuffer;
}