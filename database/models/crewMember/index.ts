import { Column, OneToMany, ManyToOne, Entity } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { InventorySlot } from "../inventory";
import { Carriage } from "../carriage";

@Entity("CrewMember")
export class CrewMember extends BaseIdNameEntity {
  @Column("decimal", { precision: 2, scale: 2 })
  strength: number;

  @Column("decimal", { precision: 2, scale: 2 })
  agility: number;

  @Column("decimal", { precision: 2, scale: 2 })
  intelligence: number;

  @OneToMany(type => InventorySlot, slot => slot.crewMember, { onDelete: "CASCADE" })
  inventory: InventorySlot[];

  @OneToMany(type => InventorySlot, slot => slot.crewMember, { onDelete: "CASCADE" })
  equipment: InventorySlot[];

  @ManyToOne(type => Carriage, carriage => carriage.crew, { onDelete: "SET NULL" })
  carriage: Carriage;
}
