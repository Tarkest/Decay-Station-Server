import { Entity, Column, ManyToMany, OneToOne, JoinColumn, JoinTable } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { EnvironmentType } from "../сonstantsData";
import { SectorDataBuffer } from "./sectorBuffer";

@Entity("SectorData")
export class SectorData extends BaseIdNameEntity {
  @Column()
  positionX: number;

  @Column()
  positionY: number;

  @ManyToMany(type => EnvironmentType, environmentType => environmentType.sectors)
  @JoinTable({ name: "SectorDataToEnvironment" })
  environment: EnvironmentType;

  @OneToOne(type => SectorDataBuffer, buffer => buffer.currentVersion, { onDelete: "SET NULL" })
  @JoinColumn()
  updateBuffer: SectorDataBuffer;
}