import { Entity, OneToMany } from "typeorm";
import { BaseIdNameEntity } from "../../models/baseEntities";
import { ItemData } from "../itemData";

@Entity()
export class ItemsType extends BaseIdNameEntity {

  @OneToMany(type => ItemData, itemData => itemData.type)
  items: ItemData[];
}