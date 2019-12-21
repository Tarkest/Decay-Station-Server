import {Column, Entity, OneToMany} from "typeorm";
import {BaseTypeEntity} from "../_BaseEntities/BaseTypeEntity";
import CarriageAssemblyItem from "./CarriageAssemblyItem";
import CarriageBuildingPosition from "./CarriageBuildingPosition";

@Entity('CarriageTypes')
export default class CarriageType extends BaseTypeEntity {
    @Column()
    storageCapacity: number;

    @OneToMany(type => CarriageAssemblyItem, item => item.carriageType)
    assemblyItems: CarriageAssemblyItem[];

    @OneToMany(type => CarriageBuildingPosition, position => position.carriageType)
    buildingSlot: CarriageBuildingPosition[];
}