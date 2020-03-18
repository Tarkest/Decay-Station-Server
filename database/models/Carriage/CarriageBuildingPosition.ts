// import {BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable, ManyToOne} from "typeorm";
// import {BuildingType} from "../Constants/BuildingTypes";
// import CarriageData from "./carriageData";

// @Entity("BuildingPosition")
// export default class CarriageBuildingPosition extends BaseEntity {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     buildingSize: number;

//     @ManyToMany(type => BuildingType)
//     @JoinTable()
//     buildingsTypes: BuildingType[];

//     @ManyToOne(type => CarriageData, carType => carType.buildingSlot)
//     carriageData: CarriageData;
// }