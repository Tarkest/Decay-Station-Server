import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {TimeStampType} from "./TimeStampType";
import {Item} from "../Item";

@Entity('TimeStamps')
export class TimeStamp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'date'})
    endDate;

    @Column({type: 'date'})
    startDate;

    @OneToOne(type => TimeStampType)
    @JoinColumn()
    type: TimeStampType

    @OneToOne(type => Item)
    @JoinColumn()
    item: Item
}

export * from './TimeStampType'