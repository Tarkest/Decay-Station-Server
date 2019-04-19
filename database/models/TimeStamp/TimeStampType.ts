import {Entity, JoinColumn, OneToOne} from "typeorm";
import {BaseIdNameEntity} from "../_BaseEntities/BaseIdNameEntity";
import {Item} from "../Item";

@Entity('TimeStampTypes')
export class TimeStampType extends BaseIdNameEntity {

}
