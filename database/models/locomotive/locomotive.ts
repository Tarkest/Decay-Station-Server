import { BaseEntity, PrimaryGeneratedColumn, OneToMany, ManyToOne, Column, OneToOne, JoinColumn, Entity } from "typeorm";
import { LocomotiveData } from "../locomotiveData";
import { LocomotiveUpdateSlot } from "./locomotiveUpdateSlot";
import { LocomotiveBuilding } from "./locomotiveBuilding";
import { AccountData } from "../userData";

@Entity()
export class Locomotive extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  level: number;

  @ManyToOne(type => LocomotiveData, data => data.locomotives, { onDelete: "SET NULL" })
  @JoinColumn()
  data: LocomotiveData;

  @OneToMany(type => LocomotiveUpdateSlot, slot => slot.locomotive, { onDelete: "CASCADE" })
  upgradeSlots: LocomotiveUpdateSlot[];

  @OneToMany(type => LocomotiveBuilding, building => building.locomotive, { onDelete: "CASCADE" })
  buildings: LocomotiveBuilding[];

  @OneToOne(type => AccountData, account => account.locomotive, { onDelete: "SET NULL" })
  @JoinColumn()
  account: AccountData;
}
