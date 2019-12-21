import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";

@Entity("administator")
export default class Administrator extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    password: string;
}