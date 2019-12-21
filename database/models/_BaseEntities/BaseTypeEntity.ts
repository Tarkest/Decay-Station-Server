import {Column} from "typeorm";
import {BaseIdNameEntity} from "./BaseIdNameEntity";

export abstract class BaseTypeEntity extends BaseIdNameEntity {
    @Column()
    appearenceVersion: string;
}