import {Column, Entity, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import {BaseTypeEntity} from "../_BaseEntities/BaseTypeEntity";
import {ItemsType} from "../Constants/ItemsTypes";
import ItemTypeBuffer from "./ItemTypeBuffer";

@Entity("ItemType")
export default class ItemType extends BaseTypeEntity {
    @Column()
    maxCount: number;

    @ManyToOne(type => ItemsType, ItemsType => ItemsType.items)
    itemType: ItemsType;

    @OneToOne(type => ItemTypeBuffer, buffer => buffer.currentVersion, { cascade: true })
    @JoinColumn()
    updateBuffer: ItemTypeBuffer;
}