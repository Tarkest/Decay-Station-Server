import {PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, ManyToOne, Column} from "typeorm";
import {Carriage, Locomotive, TimeStamp, TrainBuildingType} from '../'
import {BaseIdNameEntity} from "../_BaseEntities/BaseIdNameEntity";

@Entity('TrainBuildings')
export class TrainBuilding extends BaseIdNameEntity {
    @Column({default: 'false'})
    isOuter: boolean;

    @OneToOne(type => TrainBuildingType)
    @JoinColumn()
    type: TrainBuildingType;

    @OneToOne(type => TimeStamp)
    @JoinColumn()
    currentStamp: TimeStamp;

    @ManyToOne(type => Locomotive, locomotive => locomotive.buildings)
    locomotive: Locomotive;

    @ManyToOne(type => Carriage, locomotive => locomotive.buildings)
    carriage: Carriage;

}

export * from './TrainBuildingType'