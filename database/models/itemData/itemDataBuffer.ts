import { Column, Entity, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { ItemsType, ItemsRarity } from "../сonstantsData";
import { ItemData } from "./itemData";

@Entity()
export class ItemDataBuffer extends BaseIdNameEntity {
  @Column()
  maxCount: number;

  @ManyToOne(type => ItemsType, itemsType => itemsType.items, { onDelete: "SET NULL" })
  type: ItemsType;

  @ManyToOne(type => ItemsRarity, itemsRarity => itemsRarity.items, { onDelete: "SET NULL" })
  rarity: ItemsRarity;

  @OneToOne(type => ItemData, buffer => buffer.updateBuffer, { onDelete: "CASCADE" })
  @JoinColumn()
  currentVersion: ItemData;
}
