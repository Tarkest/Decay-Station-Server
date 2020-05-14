import { BaseEntity, Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LocomotiveData } from "./locomotiveData";
import { BuildingType } from "../сonstants";

@Entity("LocomotivesBuildingSlotsData")
export class LocomotiveBuildingSlot extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    level: number;

    @ManyToOne(type => BuildingType, typeData => typeData.locomotiveSlots, { onDelete: "SET NULL" })
    buildingType: BuildingType;

    @ManyToOne(type => LocomotiveData, locomotiveData => locomotiveData.buildingSlots, { onDelete: "CASCADE" })
    locomotiveData: LocomotiveData;
}