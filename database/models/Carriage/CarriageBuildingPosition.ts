import {BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToMany, JoinTable, ManyToOne} from "typeorm";
import {BuildingType} from "../Constants/BuildingTypes";
import CarriageType from "./CarriageType";

@Entity("BuildingPosition")
export default class CarriageBuildingPosition extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    buildingSize: number;

    @ManyToMany(type => BuildingType)
    @JoinTable()
    buildingsTypes: BuildingType[];

    @ManyToOne(type => CarriageType, carType => carType.buildingSlot)
    carriageType: CarriageType;
}