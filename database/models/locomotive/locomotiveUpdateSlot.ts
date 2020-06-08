import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Entity } from "typeorm";
import { Locomotive } from "./locomotive";

@Entity()
export class LocomotiveUpdateSlot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number;

  @Column()
  requiredCount: number;

  @ManyToOne(type => Locomotive, locomotive => locomotive.upgradeSlots, { onDelete: "SET NULL" })
  @JoinColumn()
  locomotive: Locomotive;
}
