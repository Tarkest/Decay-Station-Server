import { Entity, Column, BaseEntity, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import { hashSync } from "bcryptjs";

@Entity("Administation")
export default class Administrator extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;
}