import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne} from "typeorm";
import {BaseIdNameEntity} from "../_BaseEntities/BaseIdNameEntity";
import {User} from "../User";
import {Item} from "../Item";
import {CharacterSpecialization, CharacterType} from '../'

@Entity('Characters')
export class Character extends BaseIdNameEntity {
    @Column()
    strength: number;

    @Column()
    agility: number;

    @Column()
    intelligence: number;

    @ManyToOne(type => User, u => u.characters, {nullable: false})
    user: User;

    @OneToMany(type => Item, item => item.character)
    items: Item[];

    @ManyToOne(type => CharacterType, {nullable: false})
    @JoinColumn()
    type: CharacterType;

    @ManyToOne(type => CharacterSpecialization, {nullable: false})
    @JoinColumn()
    specialization: CharacterSpecialization;
}

export * from './CharacterSpecialization'
export * from './CharacterType'