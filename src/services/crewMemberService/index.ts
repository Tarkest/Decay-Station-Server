import { getRepository } from "typeorm";
import { CrewMember } from "../../../database/models/crewMember";
import { AccountData } from "../accountService";
import { Carriage } from "../carriage";
import InventoryService from "../inventory";

export enum CharacteristicType {
    Strength = "strength",
    Agility = "agility",
    Intelligence = "intelligence"
}

export default class CrewMemberService {

    //Repositories
    private crewMemberDataRepository = getRepository(CrewMember);

    //Services
    private inventoryService = new InventoryService();

    public async getDriver(account: AccountData): Promise<CrewMember> {
        return this.crewMemberDataRepository.findOne({ where: { account } });
    }

    public async getCrewMemberById(memberId: number): Promise<CrewMember> {
        return this.crewMemberDataRepository.findOne({ where: { id: memberId } });
    }

    public async createDriver(account: AccountData): Promise<CrewMember> {
        const driver = await this.crewMemberDataRepository.save({ 
            name: "Artem Huzii", 
            agility: 3, 
            intelligence: 3, 
            strength: 3,
            account 
        });
        await this.inventoryService.createCrewMemberSlots(driver, account.id);
        return driver;
    }

    public async addCrewMember(account: AccountData, carriage: Carriage, memberData: CrewMember): Promise<CrewMember> {
        const newMember = await this.crewMemberDataRepository.save({
            ...memberData,
            carriage
        });
        await this.inventoryService.createCrewMemberSlots(newMember, account.id);
        return newMember;
    }

    public async updateCharacteristic(memberId: number, characteristic: CharacteristicType, updateValue: number): Promise<CrewMember> {
        const memberData = await this.crewMemberDataRepository.findOne({ where: { id: memberId } });

        if(!memberData) throw Error("Cannot update characteristic of member what doesn't exists");

        return this.crewMemberDataRepository.save({
            ...memberData,
            [characteristic]: memberData[characteristic] + updateValue
        });
    }
}

export { CrewMember } from "../../../database/models/crewMember";
