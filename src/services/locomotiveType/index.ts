import { getRepository, Repository } from "typeorm";
import LocomotiveType from "../../../database/models/Locomotive/LocomotiveType";
import LocomotiveTypeUpgrade from "../../../database/models/Locomotive/LocomotiveTypeUpgrade";
import LocomotiveTypeUpgradeBuffer from "../../../database/models/Locomotive/LocomotiveTypeUpgradeBuffer";
import LocomotiveTypeBuffer from "../../../database/models/Locomotive/LocomotiveTypeBuffer";
import { locomotiveTypeDTO, locomotiveTypeToModel } from "./utils";

export default class LocomotiveTypeService {
    private typeRepository: Repository<LocomotiveType> = getRepository(LocomotiveType);
    private typeUpgradeRepository: Repository<LocomotiveTypeUpgrade> = getRepository(LocomotiveTypeUpgrade);
    private typeBufferRepository: Repository<LocomotiveTypeBuffer> = getRepository(LocomotiveTypeBuffer);
    private typeUpgradeBufferRepository : Repository<LocomotiveTypeUpgradeBuffer> = getRepository(LocomotiveTypeUpgradeBuffer);

    public async createLocomotiveType(name: string): Promise<LocomotiveType> {
        const checkType = await this.typeRepository.findOne({ where: { name }});
        if(checkType) throw Error("There is locomotive with this name");
        return this.typeRepository.save({ name, appearenceVersion: "0000000", inRotation: false });
    }

    public async getLocomotivesTypes() {
        const locomotivesTypes = await this.typeRepository.find({ relations: ["upgradesRecipes"] });
        return { items: locomotivesTypes.map((type) => locomotiveTypeDTO(type)) };
    }    

    public async updateLocomotiveType(model) {

    }

    public async deleteLocomotiveType() {
        
    }
}