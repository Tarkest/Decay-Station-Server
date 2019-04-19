import {Column, PrimaryGeneratedColumn, Entity, OneToOne, ManyToOne, OneToMany} from "typeorm";
import {User, TrainBuilding} from '../'
import {Item} from "../Item";

@Entity('Locomotives')
export class Locomotive {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 1})
    level: number;

    @ManyToOne(type => User, user => user.locomotives)
    user: User;

    @OneToMany(type => TrainBuilding, tb => tb.locomotive)
    buildings: TrainBuilding[];

    @OneToMany(type => Item, item => item.locomotive)
    items: Item[]
}
