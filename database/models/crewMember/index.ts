import { Column, OneToMany, ManyToOne, Entity, OneToOne, JoinColumn } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { InventorySlot } from "../inventory";
import { Carriage } from "../carriage";
import { AccountData } from "../userData";

@Entity()
export class CrewMember extends BaseIdNameEntity {
  @Column("decimal", { precision: 4, scale: 2 })
  strength: number;

  @Column("decimal", { precision: 4, scale: 2 })
  agility: number;

  @Column("decimal", { precision: 4, scale: 2 })
  intelligence: number;

  @OneToOne(type => AccountData, account => account.driver, { onDelete: "SET NULL" })
  @JoinColumn()
  account: AccountData;

  @OneToMany(type => InventorySlot, slot => slot.crewMember, { onDelete: "CASCADE" })
  inventory: InventorySlot[];

  @OneToMany(type => InventorySlot, slot => slot.crewMemberEquipment, { onDelete: "CASCADE" })
  equipment: InventorySlot[];

  @ManyToOne(type => Carriage, carriage => carriage.crew, { onDelete: "SET NULL" })
  @JoinColumn()
  carriage: Carriage;
}
