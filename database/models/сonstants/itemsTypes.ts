import { Entity, OneToMany } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { ItemData } from "../item";

@Entity("ItemsType")
export class ItemsType extends BaseIdNameEntity {

    @OneToMany(type => ItemData, itemData => itemData.type)
    items: ItemData[];
}