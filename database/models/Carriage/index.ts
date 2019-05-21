import {Column, Entity, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import {BaseIdNameEntity} from "../_BaseEntities/BaseIdNameEntity";
import {User} from '../'
import {TrainBuilding, CarriageType} from "../index";
import {Item} from "../Item";


@Entity('Carriages')
export class Carriage extends BaseIdNameEntity {
    @Column({nullable: false})
    userId: number;

    @Column({nullable: false, default: 1})
    order: number;

    @ManyToOne(type => User, user => user.carriages)
    @JoinColumn({name: 'userId'})
    user: User;

    @OneToMany(type => TrainBuilding, building => building.carriage)
    buildings: TrainBuilding[];

    @OneToMany(type => Item, item => item.carriage)
    items: Item[];

    @ManyToOne(type => CarriageType, {nullable: false})
    type: CarriageType
}

export * from './CarriageType';
