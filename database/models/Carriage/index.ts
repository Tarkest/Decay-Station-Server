import {Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany, OneToOne, JoinColumn} from "typeorm";
import {BaseIdNameEntity} from "../_BaseEntities/BaseIdNameEntity";
import {User} from '../'
import {TrainBuilding, CarriageType} from "../index";
import {Item} from "../Item";


@Entity('Carriages')
export class Carriage extends BaseIdNameEntity {
    @ManyToOne(type => User, user => user.carriages)
    user: User;

    @OneToMany(type => TrainBuilding, building => building.carriage)
    buildings: TrainBuilding[]

    @OneToMany(type => Item, item => item.carriage)
    items: Item[]

    @OneToOne(type => CarriageType)
    @JoinColumn()
    type: CarriageType;
}

export * from './CarriageType'