import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Administation")
export default class Administrator extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;
}