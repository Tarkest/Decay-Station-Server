import {Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany, OneToOne, JoinColumn} from "typeorm";
import {User, TrainBuilding, LocomotiveType} from '../'
import {Item} from "../Item";

@Entity('Locomotives')
export class Locomotive {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 1})
    level: number;

    @OneToOne(type => LocomotiveType)
    @JoinColumn()
    type: LocomotiveType

    @ManyToOne(type => User, user => user.locomotives)
    user: User;

    @OneToMany(type => TrainBuilding, tb => tb.locomotive)
    buildings: TrainBuilding[];

    @OneToMany(type => Item, item => item.locomotive)
    items: Item[]
}

export * from './LocomotiveType'