import { Entity, OneToMany } from "typeorm";
import { BaseIdNameEntity } from "../../models/baseEntities";
import { SectorData, SectorDataBuffer } from "../mapData";

@Entity()
export class EnvironmentType extends BaseIdNameEntity {

  @OneToMany(type => SectorData, sector => sector.environment)
  sectors: SectorData[];

  @OneToMany(type => SectorDataBuffer, sectorBuffer => sectorBuffer.environment)
  sectorsBuffers: SectorDataBuffer[];
}
