import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, ManyToOne } from "typeorm";
import { BuildingType } from "../сonstants";
import { CarriageDataBuffer } from "./carriageDataBuffer";

@Entity("CarriageBuildingSlotBuffer")
export class CarriageBuildingSlotBuffer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    buildingSize: number;

    @ManyToOne(type => BuildingType, { onDelete: "SET NULL" })
    buildingType: BuildingType;

    @ManyToOne(type => CarriageDataBuffer, carriageData => carriageData.buildingSlots, { onDelete: "CASCADE" })
    carriageData: CarriageDataBuffer;
}