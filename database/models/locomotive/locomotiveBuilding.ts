import { BaseEntity, PrimaryGeneratedColumn, ManyToOne, Column, JoinColumn, Entity } from "typeorm";
import { Locomotive } from "./locomotive";

@Entity()
export class LocomotiveBuilding extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  index: number;

  @ManyToOne(type => Locomotive, locomotive => locomotive.buildings, { onDelete: "SET NULL" })
  @JoinColumn()
  locomotive: Locomotive;
}