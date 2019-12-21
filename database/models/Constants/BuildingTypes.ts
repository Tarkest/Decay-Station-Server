import {BaseEntity, PrimaryGeneratedColumn, Column, Entity} from "typeorm";

@Entity("BuildingType")
export class BuildingType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;
}