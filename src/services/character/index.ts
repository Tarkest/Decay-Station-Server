import {getCustomRepository} from "typeorm";
import {CharacterRepository} from "../../repositories/character";
import {CharacterSpecialization, CharacterType} from "../../../database/models/Character";

const specializationStats = {
    1: {
        intelligence: 1,
        agility: 1,
        strength: 2
    }
}

export default class CharacterService {
    repository = getCustomRepository(CharacterRepository);

    async createCharacter({name, typeId, specId}, userId) {
        const type = await CharacterType.findOne({id: typeId});
        const specialization = await CharacterSpecialization.findOne({id: specId});

        if (!type) throw new Error('Type desnt exist');
        if (!specialization) throw new Error('Spec doesnt exist');

        return this.repository.save({name, strength: 1, ...specializationStats[typeId], type, specialization})
    }
}
