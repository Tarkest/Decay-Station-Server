import { getRepository, Repository } from "typeorm";
import {
  IngredientToRecipe,
  RecipeData,
  ResultToRecipe,
  IngredientToRecipeBuffer,
  RecipeDataBuffer,
  ResultToRecipeBuffer
} from "../../../database/models/recipes";
import ItemDataService, { ItemData } from "../itemData";
import { IRecipeIngredient, IRecipeResult } from '../interfaces';

export default class RecipeService {

  // Repositories
  private dataRepository: Repository<RecipeData> = getRepository(RecipeData);
  private ingredientRepository: Repository<IngredientToRecipe> = getRepository(IngredientToRecipe);
  private resultRepository: Repository<ResultToRecipe> = getRepository(ResultToRecipe);
  private dataBufferRepository: Repository<RecipeDataBuffer> = getRepository(RecipeDataBuffer);
  private ingredientBufferRepository: Repository<IngredientToRecipeBuffer> = getRepository(IngredientToRecipeBuffer);
  private resultBufferRepository: Repository<ResultToRecipeBuffer> = getRepository(ResultToRecipeBuffer);

  // Services
  private itemService: ItemDataService = new ItemDataService();

  public async createRecipe(ingredients: IRecipeIngredient[], results: IRecipeResult[]): Promise<RecipeData> {
    for (let ingredientIndex = 0; ingredientIndex < ingredients.length; ingredientIndex++) {
      const itemCheck: ItemData = await this.itemService.getItemById(ingredients[ingredientIndex].item.id);
      if(!itemCheck) throw Error("One of item have invalid item id");
      if(ingredients[ingredientIndex].count > itemCheck.maxCount) ingredients[ingredientIndex].count = itemCheck.maxCount;
    }
    for (let resultIndex = 0; resultIndex < results.length; resultIndex++) {
      const itemCheck: ItemData = await this.itemService.getItemById(results[resultIndex].item.id);
      if(!itemCheck) throw Error("One of item have invalid item id");
      if(results[resultIndex].count > itemCheck.maxCount) results[resultIndex].count = itemCheck.maxCount;
    }
    const ingredientsData: IngredientToRecipe[] = [];
    const resultsData: ResultToRecipe[] = [];
    const resipeData: RecipeData = await this.dataRepository.save({ inRotation: false });
    ingredients.map(async ({ count, item }, index) => {
      ingredientsData[index] = await this.ingredientRepository.save({ item, count, recipe: resipeData });
    });
    results.map(async ({ count, dropChance, item }, index) => {
      resultsData[index] = await this.resultRepository.save({ item, dropChance, count, recipe: resipeData });
    });
    return resipeData;
  }

  public async getRecipesData() {
    return this.dataRepository.find({
      relations: [
        "ingredients",
        "results",
        "ingredients.item",
        "results.item",
        "updateBuffer",
        "updateBuffer.ingredients",
        "updateBuffer.results",
        "updateBuffer.ingredients.item",
        "updateBuffer.results.item"
      ]
    })
  }

  public async getRecipeById(id: number) {
    return this.dataRepository.findOne({ where: { id } });
  }

  public async saveUpdateForRecipe(id: number, ingredients: IRecipeIngredient[], results: IRecipeResult[]): Promise<RecipeData> {
    const recipeData: RecipeData = await this.dataRepository.findOne({
      where: {
        id
      },
      relations: [
        "ingredients",
        "results",
        "updateBuffer"
      ]
    });
    if(!recipeData) throw Error("Requested recipe is not exist");
    for (let ingredientIndex = 0; ingredientIndex < ingredients.length; ingredientIndex++) {
      const itemCheck: ItemData = await this.itemService.getItemById(ingredients[ingredientIndex].item.id);
      if(!itemCheck) throw Error("One of item have invalid item id");
      if(ingredients[ingredientIndex].count > itemCheck.maxCount) ingredients[ingredientIndex].count = itemCheck.maxCount;
    }
    for (let resultIndex = 0; resultIndex < results.length; resultIndex++) {
      const itemCheck: ItemData = await this.itemService.getItemById(results[resultIndex].item.id);
      if(!itemCheck) throw Error("One of item have invalid item id");
      if(results[resultIndex].count > itemCheck.maxCount) results[resultIndex].count = itemCheck.maxCount;
    }
    if(recipeData.updateBuffer) {
      await this.ingredientBufferRepository.remove(recipeData.updateBuffer.ingredients);
      await this.resultBufferRepository.remove(recipeData.updateBuffer.results);
    }
    const ingredientsBufferData: IngredientToRecipeBuffer[] = [];
    const resultsBufferData: ResultToRecipeBuffer[] = [];
    const recipeDataBuffer: RecipeDataBuffer = await this.dataBufferRepository.save({ ...recipeData.updateBuffer, currentVersion: recipeData });
    ingredients.map(async ({ count, item }, index) => {
      ingredientsBufferData[index] = await this.ingredientBufferRepository.save({ count, item, recipe: recipeDataBuffer });
    });
    results.map(async ({ count, dropChance, item }, index) => {
      resultsBufferData[index] = await this.resultBufferRepository.save({ count, dropChance, item, recipe: recipeDataBuffer });
    });
    return this.dataRepository.save({ ...recipeData, updateBuffer: recipeDataBuffer });
  }

  public async changeRotationStatus(id: number): Promise<RecipeData> {
    const recipeData: RecipeData = await this.dataRepository.findOne({ where: { id } });
    if(!recipeData) throw Error("There is no recipe with this id");
    return this.dataRepository.save({ ...recipeData, inRotation: !recipeData.inRotation });
  }

  public async removeUpdates(id: number): Promise<RecipeDataBuffer> {
    const updateBuffer: RecipeDataBuffer = await this.dataBufferRepository.findOne({
      where: {
        id
      },
      relations: [
        "ingredients",
        "results"
      ]
    });
    if(!updateBuffer) throw Error("There is no incoming update already, please reload the editor");
    await this.ingredientBufferRepository.remove(updateBuffer.ingredients);
    await this.resultBufferRepository.remove(updateBuffer.results);
    return this.dataBufferRepository.remove(updateBuffer);
  }

  public async deleteRecipeData(id: number): Promise<RecipeData> {
    const recipe: RecipeData = await this.dataRepository.findOne({
      where: {
        id
      },
      relations: [
        "updateBuffer",
        "ingredients",
        "results",
        "updateBuffer.ingredients",
        "updateBuffer.results"
      ]
    });
    if (recipe.updateBuffer) {
      await this.ingredientBufferRepository.remove(recipe.updateBuffer.ingredients);
      await this.resultBufferRepository.remove(recipe.updateBuffer.results);
      await this.dataBufferRepository.remove(recipe.updateBuffer);
    }
    if(!recipe) throw Error("There is no Recipe with this id");
    await this.ingredientRepository.remove(recipe.ingredients);
    await this.resultRepository.remove(recipe.results);
    return this.dataRepository.remove(recipe);
  }
}

export { RecipeData } from "../../../database/models/recipes";