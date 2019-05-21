import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('ParametersExperiences')
export class ParametersExperience extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, default: 1})
    strength: number;

    @Column({nullable: false, default: 1})
    agility: number;

    @Column({nullable: false, default: 1})
    intelligence: number
}