import {Entity, Column, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { LocomotiveDataBuffer } from "./locomotiveDataBuffer";
import { BuildingType } from "../сonstants";

@Entity("LocomotivesBuildingSlotsDataBuffer")
export class LocomotiveBuildingSlotBuffer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    level: number;

    @ManyToOne(type => BuildingType, typeData => typeData.locomotiveSlotsBuffers, { onDelete: "SET NULL" })
    buildingType: BuildingType;

    @ManyToOne(type => LocomotiveDataBuffer, locomotiveData => locomotiveData.buildingSlots, { onDelete: "CASCADE" })
    locomotiveData: LocomotiveDataBuffer;
}