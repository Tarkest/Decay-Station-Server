import {Character, User} from "../../database/models";
import {EntityRepository, getCustomRepository, Repository, In} from "typeorm";

@EntityRepository(Character)
export class CharacterRepository extends Repository<Character> {
}

