import {Column, Entity, ManyToOne, OneToMany} from "typeorm";
import {BaseIdNameEntity} from "../_BaseEntities/BaseIdNameEntity";
import {Carriage, Character, Locomotive} from "../index";

@Entity('Items')
export class Item extends BaseIdNameEntity {
    @Column()
    amount: number;

    @Column()
    cellId: number;

    @ManyToOne(type => Locomotive, loco => loco.items)
    locomotive: Locomotive;

    @ManyToOne(type => Carriage, carriage => carriage.items)
    carriage: Carriage;

    @ManyToOne(type => Character, char => char.items)
    character: Character
}
