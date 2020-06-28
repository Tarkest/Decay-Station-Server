import { getRepository } from "typeorm";
import { CrewMember } from "../../../database/models/crewMember";
import { AccountData } from "../accountService";
import InventoryService from "../inventory";

export default class CrewMemberService {

    //Repositories
    private crewMemberDataRepository = getRepository(CrewMember);

    //Services
    private inventoryService = new InventoryService();


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
}

export { CrewMember } from "../../../database/models/crewMember";
