import { Entity, OneToMany } from "typeorm";
import { BaseIdNameEntity } from "../_BaseEntities/BaseIdNameEntity";
import { ItemData } from "../Item/itemData";

@Entity("ItemsRarity")
export class ItemsRarity extends BaseIdNameEntity {

    @OneToMany(type => ItemData, itemData => itemData.rarity)
    items: ItemData[];
}
