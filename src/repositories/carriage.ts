import {Carriage} from "../../database/models";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Carriage)
export class CarriageRepository extends Repository<Carriage> {
    getMaxOrder(userId) {
        return this.query(`select MAX("Carriages"."order") from "Carriages" where "userId" = ${userId}`)
    }
}

