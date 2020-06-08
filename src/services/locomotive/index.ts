import { getRepository, Repository } from "typeorm";
import { Locomotive } from "../../../database/models/locomotive";
import LocomotiveDataService, { LocomotiveData } from "../locomotiveData";
import { AccountData } from "../accountService";


export default class LocomotiveService {

  // Repositories

  private dataRepository: Repository<Locomotive> = getRepository(Locomotive);

  // Services

  private locomotiveDataService: LocomotiveDataService = new LocomotiveDataService();

  public async createLocomotive(accountData: AccountData, locomotiveDataId: number) {
    const locomotiveData: LocomotiveData = await this.locomotiveDataService.getLocomotiveData(locomotiveDataId);
    const locomotive: Locomotive = await this.dataRepository.save({ account: accountData, name: accountData.userName, data: locomotiveData, level: 1 });
    return locomotive;
  }
}

export { Locomotive } from "../../../database/models/locomotive/locomotive";