import { getRepository, Repository } from "typeorm";
import { BuildingData, BuildingDataBuffer } from "../../../database/models/buildings";
import RecipeService, { RecipeData } from "../recipesData";
import ConstantsService, { BuildingType } from "../constants";

export default class BuildingService {

  // Repositories

  private dataRepository: Repository<BuildingData> = getRepository(BuildingData);
  private dataBufferRepository: Repository<BuildingDataBuffer> = getRepository(BuildingDataBuffer);

  // Services

  private recipeService: RecipeService = new RecipeService();
  private constantsService: ConstantsService = new ConstantsService();

  public async createBuildingData(name: string, size: number, typeId: number, recipes: any[]): Promise<BuildingData> {
    const checkType: BuildingData = await this.dataRepository.findOne({ where: { name } });
    if(checkType) throw Error("There is building with this name");
    for (let recipeIndex = 0; recipeIndex < recipes.length; recipeIndex++) {
      const recipeCheck: RecipeData = await this.recipeService.getRecipeById(recipes[recipeIndex].id);
      if(!recipeCheck) throw Error("One of recipe have invalid recipe id");
      recipes[recipeIndex] = recipeCheck;
    }
    const buildingType: BuildingType = await this.constantsService.getBuildingsType(typeId);
    return this.dataRepository.save({ name, type: buildingType, size, recipes });
  }

  public async getBuildingsTypes() {
    return this.dataRepository.find({
      relations: [
        "type",
        "recipes",
        "updateBuffer"
      ]
    });
  }

  public async saveUpdateForBuilding(id: number, size: number, typeId: number, recipes: any[]): Promise<BuildingData> {
    const buildingData: BuildingData = await this.dataRepository.findOne({
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
    const updateBuffer = await this.dataBufferRepository.save({ ...buildingData, size, type: buildingType, recipes, currentVersion: buildingData });
    return this.dataRepository.save({ ...buildingData, updateBuffer });
  }

  public async removeUpdates(id: number): Promise<BuildingDataBuffer> {
    const updateBuffer: BuildingDataBuffer = await this.dataBufferRepository.findOne({ where: { id } });
    if(!updateBuffer) throw Error("There is no incoming update already, please reload the editor");
    return this.dataBufferRepository.remove(updateBuffer);
  }

  public async deleteBuildingData(id: number): Promise<BuildingData> {
    const buildingData: BuildingData = await this.dataRepository.findOne({ where: { id } });
    if(!buildingData) throw Error("There is no building with this id");
    return this.dataRepository.remove(buildingData);
  }
}