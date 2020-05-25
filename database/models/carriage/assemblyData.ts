import { BaseEntity, PrimaryGeneratedColumn, JoinColumn, ManyToOne, Column, Entity } from "typeorm";
import { Carriage } from "./";

@Entity("CarriageAssemble")
export class CarriageAssembleSlot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number;

  @Column()
  requiredCount: number;

  @ManyToOne(type => Carriage, carriage => carriage.assembleSlots, { onDelete: "SET NULL" })
  @JoinColumn()
  carriage: Carriage;
}
