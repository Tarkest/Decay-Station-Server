import { getRepository } from "typeorm";
import { BuildingData, BuildingDataBuffer } from "../../../database/models/buildingsData";
import RecipeService from "../recipesData";
import ConstantsService from "../constants";

export default class BuildingService {

  // Repositories

  private buildingDataRepository = getRepository(BuildingData);
  private buildingDataBufferRepository = getRepository(BuildingDataBuffer);

  // Services

  private recipeService = new RecipeService();
  private constantsService = new ConstantsService();

  public async createBuildingData(name: string, size: number, typeId: number, recipes: any[]): Promise<BuildingData> {

    const checkType = await this.buildingDataRepository.findOne({ where: { name } });

    if(checkType) throw Error("There is building with this name");

    for (let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++) {
      const recipeCheck = await this.recipeService.getRecipeById(recipes[recipeIndex].id);
      if(!recipeCheck) throw Error("One of recipe have invalid recipe id");
      recipes[recipeIndex] = recipeCheck;
    }

    const buildingType = await this.constantsService.getBuildingsType(typeId);

    return this.buildingDataRepository.save({ name, type: buildingType, size, recipes });
  }

  public async getBuildingsTypes() {
    return this.buildingDataRepository.find({
      relations: [
        "type",
        "recipes",
        "updateBuffer"
      ]
    });
  }

  public async saveUpdateForBuilding(id: number, size: number, typeId: number, recipes: any[]): Promise<BuildingData> {

    const buildingData = await this.buildingDataRepository.findOne({
      where: { id },
      relations: [
        "type",
        "recipes",
        "updateBuffer"
      ]
    });

    if(!buildingData) throw Error("Requested building is not exist");

    const buildingType = await this.constantsService.getBuildingsType(typeId);

    if(!buildingType) throw Error("Invalid building type");

    recipes = recipes.map(async (recipe) => {
      const recipeData = await this.recipeService.getRecipeById(recipe.id);
      if(!recipeData) throw Error("One of recipe have invalid id");
      return recipeData;
    });

    const updateBuffer = await this.buildingDataBufferRepository.save({ ...buildingData, size, type: buildingType, recipes, currentVersion: buildingData });

    return this.buildingDataRepository.save({ ...buildingData, updateBuffer });
  }

  public async removeUpdates(id: number): Promise<BuildingDataBuffer> {
    const updateBuffer = await this.buildingDataBufferRepository.findOne({ where: { id } });

    if(!updateBuffer) throw Error("There is no incoming update already, please reload the editor");

    return this.buildingDataBufferRepository.remove(updateBuffer);
  }

  public async deleteBuildingData(id: number): Promise<BuildingData> {
    const buildingData = await this.buildingDataRepository.findOne({ where: { id } });

    if(!buildingData) throw Error("There is no building with this id");

    return this.buildingDataRepository.remove(buildingData);
  }
}
