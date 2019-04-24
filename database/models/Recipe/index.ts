import {Entity} from "typeorm";
import {BaseIdNameEntity} from "../_BaseEntities/BaseIdNameEntity";

@Entity('Recipes')
export class Recipe extends BaseIdNameEntity {

}