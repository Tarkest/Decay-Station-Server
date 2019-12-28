import { Entity, OneToMany } from "typeorm";
import { BaseIdNameEntity } from "../_BaseEntities/BaseIdNameEntity";
import { ItemType } from "../Item/ItemType";

@Entity("ItemsType")
export class ItemsType extends BaseIdNameEntity {

    @OneToMany(type => ItemType, itemType => itemType.itemType)
    items: ItemType[];
}