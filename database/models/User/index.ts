import {Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn, ManyToOne} from "typeorm";
import {Locomotive, Carriage, Character, Zone} from '../'

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;

    @Column()
    googleApiKey: string;

    @Column()
    accountKey: string;

    @Column()
    level: number;

    @Column()
    accountExperience: number;

    @Column()
    isDeleted: boolean;

    @OneToMany(type => Locomotive, locomotive => locomotive.user)
    locomotives: Locomotive[];

    @OneToMany(type => Carriage, carriage => carriage.user)
    carriages: Carriage[];
    @OneToMany(type => Character, ch => ch.user)
    characters: Character[];

    @Column({default: 1})
    zoneId: number;

    @ManyToOne(type => Zone)
    @JoinColumn({name: "zoneId"})
    currentZone: Zone
}

export * from './Zone'
