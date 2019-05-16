import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Locomotive, Carriage, Character} from '../'

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
    level: string;

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
}
