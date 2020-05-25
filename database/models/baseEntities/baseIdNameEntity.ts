import { BaseEntity, Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseIdNameEntity extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
