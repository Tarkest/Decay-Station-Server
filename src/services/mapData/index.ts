import { getRepository, Repository } from "typeorm";
import {
  SectorData,
  SectorDataBuffer
} from "../../../database/models/map";
import ConstantsService, { EnvironmentType } from "../constants";

export default class RecipeService {

  // Repositories
  private dataRepository: Repository<SectorData> = getRepository(SectorData);
  private dataBufferRepository: Repository<SectorDataBuffer> = getRepository(SectorDataBuffer);

  // Services
  private constantsService: ConstantsService = new ConstantsService();

  public async createMapSector(name: string, environmentId: number, positionX: number, positionY: number): Promise<SectorData> {
    const sectorCheck: SectorData = await this.dataRepository.findOne({ where: { positionX, positionY } });
    if (sectorCheck) throw Error("There is already sector in this position");
    const environmentType: EnvironmentType = await this.constantsService.getEnvironmentsType(environmentId);
    if (!environmentType) throw Error("Invalid evironment type id");
    return this.dataRepository.save({ positionX, positionY, environment: environmentType, name });
  }

  public async getSectorsData() {
    return this.dataRepository.find({
      relations: [
        "updaeBuffer"
      ],
      order: {
        positionX: "ASC",
        positionY: "ASC"
      }
    });
  }

  public async saveUpdateForRecipe(id: number, name: string, environmentId: number): Promise<SectorData> {
    const sectorData: SectorData = await this.dataRepository.findOne({ where: { id } });
    if(!sectorData) throw Error("Requested sector is not exist");
    const environment: EnvironmentType = await this.constantsService.getEnvironmentsType(environmentId);
    const sectorBuffer = await this.dataBufferRepository.save({ ...sectorData, environment, currentVersion: sectorData });
    return this.dataRepository.save({ ...sectorBuffer, name, updateBuffer: sectorBuffer });
  }

  public async removeUpdates(id: number): Promise<SectorDataBuffer> {
    const updateBuffer: SectorDataBuffer = await this.dataBufferRepository.findOne({ where: { id } });
    if(!updateBuffer) throw Error("There is no incoming update already, please reload the editor");
    return this.dataBufferRepository.remove(updateBuffer);
  }

  public async deleteSectorData(id: number): Promise<SectorData> {
    const sector: SectorData = await this.dataRepository.findOne({ where: { id } });
    if(!sector) throw Error("There is no sector with this id");
    return this.dataRepository.remove(sector);
  }
}

export { SectorData } from "../../../database/models/map";