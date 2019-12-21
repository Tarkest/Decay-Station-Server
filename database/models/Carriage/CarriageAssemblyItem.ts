import BaseUpgardeItemEntity from "../_BaseEntities/BaseUpgradeItemEntity";
import {Entity, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import CarriageType from "./CarriageType";
import ItemType from "../Item/ItemType";

@Entity("CarriagesUpgrades")
export default class CarriageAssemblyItem extends BaseUpgardeItemEntity {

    @OneToOne(type => ItemType)
    @JoinColumn()
    item: ItemType;

    @ManyToOne(type => CarriageType, carType => carType.assemblyItems)
    carriageType: CarriageType;
}