import {PrimaryGeneratedColumn, Entity, OneToOne} from "typeorm";
import {BaseIdNameEntity} from "../_BaseEntities/BaseIdNameEntity";
import {TrainBuilding} from '../'

@Entity('TrainBuildingTypes')
export class TrainBuildingType extends BaseIdNameEntity {
}
