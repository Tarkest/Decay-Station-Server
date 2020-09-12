import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Entity } from "typeorm";
import { Locomotive } from "./locomotive";
import { ItemData } from "../itemData";

@Entity()
export class LocomotiveUpdateSlot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number;

  @Column()
  requiredCount: number;

  @ManyToOne(type => ItemData, { onDelete: "SET NULL" })
  @JoinColumn()
  item: ItemData;

  @ManyToOne(type => Locomotive, locomotive => locomotive.upgradeSlots, { onDelete: "SET NULL" })
  @JoinColumn()
  locomotive: Locomotive;
}
