import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { CraftData } from "../craftData";

@Entity()
export class TimeStamp extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @Column({type: "date"})
    endAt: Date;

    @OneToOne(type => CraftData, )
    @JoinColumn()
