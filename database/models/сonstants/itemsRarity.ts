import { Entity, OneToMany } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { ItemData } from "../item";

@Entity("ItemsRarity")
export class ItemsRarity extends BaseIdNameEntity {

    @OneToMany(type => ItemData, itemData => itemData.rarity)
    items: ItemData[];
}
