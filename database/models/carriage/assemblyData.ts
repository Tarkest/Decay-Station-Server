import { BaseEntity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column, Entity } from "typeorm";
import { Carriage } from "./carriage";
import { ItemData } from "../itemData";

@Entity()
export class CarriageAssembleSlot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number;

  @Column()
  requiredCount: number;

  @ManyToOne(type => ItemData, { onDelete: "SET NULL" })
  @JoinColumn()
  item: ItemData;

  @ManyToOne(type => Carriage, carriage => carriage.assembleSlots, { onDelete: "SET NULL" })
  @JoinColumn()
  carriage: Carriage;
}
