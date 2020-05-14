import { Column, Entity, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { CarriageAssemblyItem } from "./carriageAssemblyItem";
import { CarriageBuildingSlot } from "./carriageBuildingSlot";
import { CarriageDataBuffer } from "./carriageDataBuffer";

@Entity("CarriageData")
export class CarriageData extends BaseIdNameEntity {
    @Column()
    inRotation: boolean;

    @Column()
    storageCapacity: number;

    @Column()
    crewCapacity: number;

    @OneToMany(type => CarriageAssemblyItem, item => item.carriageData, { onDelete: "CASCADE" })
    assemblyItems: CarriageAssemblyItem[];

    @OneToMany(type => CarriageBuildingSlot, slot => slot.carriageData, { onDelete: "CASCADE" })
    buildingSlots: CarriageBuildingSlot[];

    @OneToOne(type => CarriageDataBuffer, buffer => buffer.currentVersion, { onDelete: "SET NULL" })
    @JoinColumn()
    updateBuffer: CarriageDataBuffer;
}