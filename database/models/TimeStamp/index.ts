import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {TimeStampType} from "./TimeStampType";
import {Item} from "../Item";
import {Recipe} from "../Recipe";

@Entity('TimeStamps')
export class TimeStamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date'})
    endDate;

    @Column({type: 'date'})
    startDate;

    @Column()
    counter: number;

    @Column()
    itemsCapacity: number;

    @OneToOne(type => TimeStampType, {nullable: false})
    @JoinColumn()
    type: TimeStampType

    @OneToOne(type => Item, {nullable: false})
    @JoinColumn()
    item: Item

    @OneToOne(type => Recipe, {nullable: false})
    @JoinColumn()
    recipe: Recipe
}

export * from './TimeStampType'