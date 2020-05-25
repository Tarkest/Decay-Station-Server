import { Entity, Column, ManyToMany, OneToOne, JoinColumn, JoinTable } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { EnvironmentType } from "../сonstantsData";
import { SectorData } from "./sectorData";

@Entity("SectorDataBuffer")
export class SectorDataBuffer extends BaseIdNameEntity {
  @Column()
  positionX: number;

  @Column()
  positionY: number;

  @ManyToMany(type => EnvironmentType, environmentType => environmentType.sectorsBuffers)
  @JoinTable({ name: "SectorDataBufferToEnvironment" })
  environment: EnvironmentType;

  @OneToOne(type => SectorData, sectorData => sectorData.updateBuffer, { onDelete: "CASCADE" })
  @JoinColumn()
  currentVersion: SectorData;
}