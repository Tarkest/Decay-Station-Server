import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { EnvironmentType } from "../сonstantsData";
import { SectorDataBuffer } from "./sectorBuffer";

@Entity()
export class SectorData extends BaseIdNameEntity {
  @Column()
  positionX: number;

  @Column()
  positionY: number;

  @ManyToOne(type => EnvironmentType, environmentType => environmentType.sectors)
  @JoinColumn()
  environment: EnvironmentType;

  @OneToOne(type => SectorDataBuffer, buffer => buffer.currentVersion, { onDelete: "SET NULL" })
  @JoinColumn()
  updateBuffer: SectorDataBuffer;
}