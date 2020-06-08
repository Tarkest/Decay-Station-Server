import { Entity, OneToMany } from "typeorm";
import { BaseIdNameEntity } from "../../models/baseEntities";
import { ItemData } from "../itemData";

@Entity()
export class ItemsRarity extends BaseIdNameEntity {

  @OneToMany(type => ItemData, itemData => itemData.rarity)
  items: ItemData[];
}
