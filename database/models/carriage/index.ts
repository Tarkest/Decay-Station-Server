import { BaseEntity,  PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, Entity } from "typeorm";
import { CarriageData } from "../carriageData";
import { InventorySlot } from "../inventory";
import { CrewMember } from "../crewMember";
import { CarriageAssembleSlot } from "./assemblyData";
import { AccountData } from "../userData";

@Entity("Carriages")
export class Carriage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => CarriageData, data => data.carriages, { onDelete: "SET NULL" })
  @JoinColumn()
  data: CarriageData;

  @OneToMany(type => InventorySlot, slot => slot.carrige, { onDelete: "CASCADE" })
  inventory: InventorySlot[];

  @OneToMany(type => CrewMember, member => member.carriage, { onDelete: "CASCADE" })
  crew: CrewMember[];

  @OneToMany(type => CarriageAssembleSlot, slot => slot.carriage, { onDelete: "CASCADE" })
  assembleSlots: CarriageAssembleSlot[];

  @ManyToOne(type => AccountData, account => account.locomotive, { onDelete: "SET NULL" })
  @JoinColumn()
  account: AccountData;
}
