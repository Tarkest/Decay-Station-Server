import {Column, PrimaryGeneratedColumn, Entity} from "typeorm";

export abstract class BaseIdNameEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
