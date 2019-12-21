import {BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToMany} from "typeorm";
import ItemType from "../Item/ItemType";

@Entity("ItemsType")
export class ItemsType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @OneToMany(type => ItemType, itemType => itemType.itemType)
    items: ItemType[];
}