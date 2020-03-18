// import BaseUpgardeItemEntity from "../_BaseEntities/BaseUpgradeItemEntity";
// import {Entity, ManyToOne, OneToOne, JoinColumn} from "typeorm";
// import CarriageData from "./carriageData";
// import { ItemData } from "../Item/ItemData";

// @Entity("CarriagesUpgrades")
// export default class CarriageAssemblyItem extends BaseUpgardeItemEntity {

//     @OneToOne(type => ItemData)
//     @JoinColumn()
//     item: ItemData;

//     @ManyToOne(type => CarriageData, carType => carType.assemblyItems)
//     carriageData: CarriageData;
// }