// import {Column, Entity, OneToMany} from "typeorm";
// import { BaseIdNameEntity } from "../_BaseEntities/BaseIdNameEntity";
// import CarriageAssemblyItem from "./carriageAssemblyItem";
// import CarriageBuildingPosition from "./carriageBuildingPosition";

// @Entity('CarriageData')
// export default class CarriageData extends BaseIdNameEntity {
//     @Column()
//     storageCapacity: number;

//     @OneToMany(type => CarriageAssemblyItem, item => item.carriageData)
//     assemblyItems: CarriageAssemblyItem[];

//     @OneToMany(type => CarriageBuildingPosition, position => position.carriageData)
//     buildingSlot: CarriageBuildingPosition[];
// }