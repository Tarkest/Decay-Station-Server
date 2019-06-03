import {Character} from "../../database/models";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Character)
export class CharacterRepository extends Repository<Character> {
}
