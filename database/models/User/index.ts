import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Locomotive, Carriage} from '../'

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    googleApiKey: string;

    @Column()
    level: string;

    @Column()
    isDeleted: boolean;

    @OneToMany(type => Locomotive, locomotive => locomotive.user)
    locomotives: Locomotive[];

    @OneToMany(type => Carriage, carriage => carriage.user)
    carriages: Carriage[];
}
