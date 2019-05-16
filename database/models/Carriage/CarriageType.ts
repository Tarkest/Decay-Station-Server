import {Entity, OneToMany, Table} from "typeorm";
import {BaseIdNameEntity} from "../_BaseEntities/BaseIdNameEntity";
import {Carriage} from "./index";

@Entity('CarriageTypes')
export class CarriageType extends BaseIdNameEntity {

}