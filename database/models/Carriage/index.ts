import {Column, Entity, ManyToOne, OneToMany, JoinColumn} from "typeorm";
import {BaseIdNameEntity} from "../_BaseEntities/BaseIdNameEntity";
import {User} from '../';
import {TrainBuilding, CarriageType} from "../index";
import {Item} from "../Item";

@Entity('Carriages')
export class Carriage extends BaseIdNameEntity {
    @Column({nullable: false})
    public userId: number;

    @Column({nullable: false, default: 1})
    public order: number;

    @ManyToOne(type => User, user => user.carriages)
    @JoinColumn({name: 'userId'})
   public user: User;

    @OneToMany(type => TrainBuilding, building => building.carriage)
   public buildings: TrainBuilding[];

    @OneToMany(type => Item, item => item.carriage)
    public items: Item[];

    @ManyToOne(type => CarriageType, {nullable: false})
    public type: CarriageType;
}

export * from './CarriageType';
