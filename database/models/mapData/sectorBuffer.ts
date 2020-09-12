import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { EnvironmentType } from "../сonstantsData";
import { SectorData } from "./sectorData";

@Entity()
export class SectorDataBuffer extends BaseIdNameEntity {
  @Column()
  positionX: number;

  @Column()
  positionY: number;

  @ManyToOne(type => EnvironmentType, environmentType => environmentType.sectorsBuffers)
  @JoinColumn()
  environment: EnvironmentType;

  @OneToOne(type => SectorData, sectorData => sectorData.updateBuffer, { onDelete: "CASCADE" })
  @JoinColumn()
  currentVersion: SectorData;
}
