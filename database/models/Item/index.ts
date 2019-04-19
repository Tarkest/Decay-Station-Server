import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {BaseIdNameEntity} from "../_BaseEntities/BaseIdNameEntity";
import {Carriage, Locomotive} from "../index";

@Entity('Items')
export class Item extends BaseIdNameEntity {
    @Column()
    amount: number;

    @ManyToOne(type => Locomotive, loco => loco.items)
    locomotive: Locomotive

    @ManyToOne(type => Carriage, carriage => carriage.items)
    carriage: Carriage
}
