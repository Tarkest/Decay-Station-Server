import {BaseEntity, Column, PrimaryGeneratedColumn} from "typeorm";

export default abstract class BaseUpgardeItemEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    count: number;
}