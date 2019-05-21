import {Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany, OneToOne, JoinColumn} from "typeorm";
import {User, TrainBuilding, LocomotiveType} from '../'
import {Item} from "../Item";

@Entity('Locomotives')
export class Locomotive {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 1})
    level: number;

    @Column()
    experience: number;

    @Column({nullable: false})
    name: string;

    @ManyToOne(type => LocomotiveType, {nullable: false})
    type: LocomotiveType

    @Column({nullable: false})
    userId: number;

    @ManyToOne(type => User, user => user.locomotives)

    @JoinColumn({name: 'userId'})
    user: User;

    @OneToMany(type => TrainBuilding, tb => tb.locomotive)
    buildings: TrainBuilding[];

    @OneToMany(type => Item, item => item.locomotive)
    items: Item[]
}

export * from './LocomotiveType'