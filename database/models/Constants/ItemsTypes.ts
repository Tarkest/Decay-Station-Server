import { Entity, OneToMany } from "typeorm";
import { BaseIdNameEntity } from "../_BaseEntities/BaseIdNameEntity";
import { ItemData } from "../Item/itemData";

@Entity("ItemsType")
export class ItemsType extends BaseIdNameEntity {

    @OneToMany(type => ItemData, itemData => itemData.type)
    items: ItemData[];
}