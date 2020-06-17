import { BaseEntity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, Entity, ManyToOne, JoinColumn } from "typeorm";
import { Locomotive } from "../locomotive/locomotive";
import { Carriage } from "../carriage/carriage";
import { SectorData } from "../mapData";

@Entity()
export class AccountData extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  googleId: string;

  @ManyToOne(type => SectorData, { onDelete: "SET NULL" })
  @JoinColumn()
  currentMapSector: SectorData;

  @OneToOne(type => Locomotive, locomotive => locomotive.account, { onDelete: "CASCADE" })
  locomotive: Locomotive;

  @OneToMany(type => Carriage, carriage => carriage.account, { onDelete: "CASCADE" })
  carriages: Carriage[];
}
