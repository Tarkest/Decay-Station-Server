import {BaseEntity, Column, PrimaryGeneratedColumn} from "typeorm";

export abstract class BaseUpgradeItemEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number;
}