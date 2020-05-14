import { Entity, ManyToMany } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { SectorData, SectorDataBuffer } from "../map";

@Entity("EnvironmentType")
export class EnvironmentType extends BaseIdNameEntity {

  @ManyToMany(type => SectorData, sector => sector.environment)
  sectors: SectorData[];

  @ManyToMany(type => SectorDataBuffer, sectorBuffer => sectorBuffer.environment)
  sectorsBuffers: SectorDataBuffer[];
}