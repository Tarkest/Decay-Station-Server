import {Column, Entity, OneToMany, OneToOne, JoinColumn} from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { CarriagesAssemblyItemBuffer } from "./carriageAssemblyItemBuffer";
import { CarriageBuildingSlotBuffer } from "./carriageBuildingSlotBuffer";
import { CarriageData } from "./carriageData";

@Entity("CarriageDataBuffer")
export class CarriageDataBuffer extends BaseIdNameEntity {
    @Column()
    storageCapacity: number;

    @Column()
    crewCapacity: number;

    @OneToMany(type => CarriagesAssemblyItemBuffer, item => item.carriageData, { onDelete: "CASCADE" })
    assemblyItems: CarriagesAssemblyItemBuffer[];

    @OneToMany(type => CarriageBuildingSlotBuffer, slot => slot.carriageData, { onDelete: "CASCADE" })
    buildingSlot: CarriageBuildingSlotBuffer[];

    @OneToOne(type => CarriageData, current => current.updateBuffer, { onDelete: "CASCADE" })
    @JoinColumn()
    currentVersion: CarriageData;
}