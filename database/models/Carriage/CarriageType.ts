import {Column, Entity, OneToMany} from "typeorm";
import { BaseIdNameEntity } from "../_BaseEntities/BaseIdNameEntity";
import CarriageAssemblyItem from "./CarriageAssemblyItem";
import CarriageBuildingPosition from "./CarriageBuildingPosition";

@Entity('CarriageTypes')
export default class CarriageType extends BaseIdNameEntity {
    @Column()
    storageCapacity: number;

    @OneToMany(type => CarriageAssemblyItem, item => item.carriageType)
    assemblyItems: CarriageAssemblyItem[];

    @OneToMany(type => CarriageBuildingPosition, position => position.carriageType)
    buildingSlot: CarriageBuildingPosition[];
}