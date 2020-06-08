import { BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Entity } from "typeorm";
import { ItemData } from "../itemData";
import { Carriage } from "../carriage";
import { CrewMember } from "../crewMember";

@Entity()
export class InventorySlot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  count: number;

  @ManyToOne(type => ItemData, item => item.inventorySlots, { onDelete: "SET NULL" })
  @JoinColumn()
  item: ItemData;

  @ManyToOne(type => Carriage, carrige => carrige.inventory, { onDelete: "SET NULL" })
  @JoinColumn()
  carrige: Carriage;

  @ManyToOne(type => CrewMember, member => member.inventory, { onDelete: "SET NULL" })
  @JoinColumn()
  crewMember: CrewMember;

  @ManyToOne(type => CrewMember, member => member.equipment, { onDelete: "SET NULL" })
  @JoinColumn()
  crewMemberEquipment: CrewMember;
}
