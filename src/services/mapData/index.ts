import { getRepository, Repository } from "typeorm";
import {
  SectorData,
  SectorDataBuffer
} from "../../../database/models/mapData";
import ConstantsService from "../constants";

export default class RecipeService {

  // Repositories
  private mapDataRepository = getRepository(SectorData);
  private mapDataBufferRepository = getRepository(SectorDataBuffer);

  // Services
  private constantsService = new ConstantsService();

  public async createMapSector(name: string, environmentId: number, positionX: number, positionY: number): Promise<SectorData> {
    const sectorCheck = await this.mapDataRepository.findOne({ where: { positionX, positionY } });

    if (sectorCheck) throw Error("There is already sector in this position");

    const environmentType = await this.constantsService.getEnvironmentsType(environmentId);

    if (!environmentType) throw Error("Invalid evironment type id");

    return this.mapDataRepository.save({ positionX, positionY, environment: environmentType, name });
  }

  public async getSectorData(positionX: number, positionY: number) {
    return this.mapDataRepository.findOne({
      where: {
        positionX,
        positionY
      }
    })
  }

  public async getSectorsData() {
    return this.mapDataRepository.find({
      relations: [
        "updateBuffer"
      ],
      order: {
        positionX: "ASC",
        positionY: "ASC"
      }
    });
  }

  public async saveUpdateForRecipe(id: number, name: string, environmentId: number): Promise<SectorData> {
    const sectorData = await this.mapDataRepository.findOne({ where: { id } });

    if(!sectorData) throw Error("Requested sector is not exist");

    const environment = await this.constantsService.getEnvironmentsType(environmentId);
    const sectorBuffer = await this.mapDataBufferRepository.save({ ...sectorData, environment, currentVersion: sectorData });

    return this.mapDataRepository.save({ ...sectorBuffer, name, updateBuffer: sectorBuffer });
  }

  public async removeUpdates(id: number): Promise<SectorDataBuffer> {
    const updateBuffer = await this.mapDataBufferRepository.findOne({ where: { id } });

    if(!updateBuffer) throw Error("There is no incoming update already, please reload the editor");

    return this.mapDataBufferRepository.remove(updateBuffer);
  }

  public async deleteSectorData(id: number): Promise<SectorData> {
    const sector = await this.mapDataRepository.findOne({ where: { id } });

    if(!sector) throw Error("There is no sector with this id");

    return this.mapDataRepository.remove(sector);
  }
}
