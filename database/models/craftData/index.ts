import { Entity, BaseEntity, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { TimeStamp } from "../timeData";

@Entity()
export class CraftData extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => TimeStamp, timeStamp => timeStamp.craftData, { onDelete: 'CASCADE' })
    timeStamp: TimeStamp;
}