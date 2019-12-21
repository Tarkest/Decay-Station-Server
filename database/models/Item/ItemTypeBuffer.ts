import {Column, Entity, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import {BaseTypeEntity} from "../_BaseEntities/BaseTypeEntity";
import {ItemsType} from "../Constants/ItemsTypes";
import ItemType from "./ItemType";

@Entity("ItemTypeBuffer")
export default class ItemTypeBuffer extends BaseTypeEntity {
    @Column()
    maxCount: number;

    @ManyToOne(type => ItemsType, ItemsType => ItemsType.items)
    itemType: ItemsType;

    @OneToOne(type => ItemType, buffer => buffer.updateBuffer)
    @JoinColumn()
    currentVersion: ItemType;
}