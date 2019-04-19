import {PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import {Carriage, Locomotive, TrainBuildingType} from '../'

@Entity('TrainBuildings')
export class TrainBuilding {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => TrainBuildingType)
    @JoinColumn()
    type: TrainBuildingType

    @ManyToOne(type => Locomotive, locomotive => locomotive.buildings)
    locomotive: Locomotive

    @ManyToOne(type => Carriage, locomotive => locomotive.buildings)
    carriage: Carriage
}

export * from './TrainBuildingType'