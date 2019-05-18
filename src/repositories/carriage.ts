import {Carriage} from "../../database/models";
import {EntityRepository, Repository} from "typeorm";

@EntityRepository(Carriage)
export class CarriageRepository extends Repository<Carriage> {

}

