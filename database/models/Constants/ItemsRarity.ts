import { Entity, OneToMany } from "typeorm";
import { BaseIdNameEntity } from "../_BaseEntities/BaseIdNameEntity";
import { ItemType } from "../Item/ItemType";

@Entity("ItemsRarity")
export class ItemsRarity extends BaseIdNameEntity {

    @OneToMany(type => ItemType, itemType => itemType.rarity)
    items: ItemType[];
}
