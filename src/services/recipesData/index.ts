import { getRepository } from "typeorm";
import {
  IngredientToRecipe,
  RecipeData,
  ResultToRecipe,
  IngredientToRecipeBuffer,
  RecipeDataBuffer,
  ResultToRecipeBuffer
} from "../../../database/models/recipesData";
import ItemDataService from "../itemData";
import { IRecipeIngredient, IRecipeResult } from '../interfaces';

export default class RecipeService {

  // Repositories
  private recipeDataRepository = getRepository(RecipeData);
  private ingredientRepository = getRepository(IngredientToRecipe);
  private resultRepository = getRepository(ResultToRecipe);
  private recipeDataBufferRepository = getRepository(RecipeDataBuffer);
  private ingredientBufferRepository = getRepository(IngredientToRecipeBuffer);
  private resultBufferRepository = getRepository(ResultToRecipeBuffer);

  // Services
  private itemService = new ItemDataService();

  public async createRecipe(ingredients: IRecipeIngredient[], results: IRecipeResult[]): Promise<RecipeData> {

    for (let ingredientIndex = 0; ingredientIndex < ingredients.length; ingredientIndex++) {

      const itemCheck = await this.itemService.getItemById(ingredients[ingredientIndex].item.id);

      if(!itemCheck) throw Error("One of item have invalid item id");

      if(ingredients[ingredientIndex].count > itemCheck.maxCount) ingredients[ingredientIndex].count = itemCheck.maxCount;
    }

    for (let resultIndex = 0; resultIndex < results.length; resultIndex++) {

      const itemCheck = await this.itemService.getItemById(results[resultIndex].item.id);

      if(!itemCheck) throw Error("One of item have invalid item id");

      if(results[resultIndex].count > itemCheck.maxCount) results[resultIndex].count = itemCheck.maxCount;
    }

    const ingredientsData: IngredientToRecipe[] = [];
    const resultsData: ResultToRecipe[] = [];
    const resipeData = await this.recipeDataRepository.save({ inRotation: false });

    ingredients.map(async ({ count, item }, index) => {
      ingredientsData[index] = await this.ingredientRepository.save({ item, count, recipe: resipeData });
    });

    results.map(async ({ count, dropChance, item }, index) => {
      resultsData[index] = await this.resultRepository.save({ item, dropChance, count, recipe: resipeData });
    });

    return resipeData;
  }

  public async getRecipesData() {
    return this.recipeDataRepository.find({
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
    return this.recipeDataRepository.findOne({ where: { id } });
  }

  public async saveUpdateForRecipe(id: number, ingredients: IRecipeIngredient[], results: IRecipeResult[]): Promise<RecipeData> {
    const recipeData = await this.recipeDataRepository.findOne({
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
      const itemCheck = await this.itemService.getItemById(ingredients[ingredientIndex].item.id);

      if(!itemCheck) throw Error("One of item have invalid item id");

      if(ingredients[ingredientIndex].count > itemCheck.maxCount) ingredients[ingredientIndex].count = itemCheck.maxCount;
    }

    for (let resultIndex = 0; resultIndex < results.length; resultIndex++) {

      const itemCheck = await this.itemService.getItemById(results[resultIndex].item.id);

      if(!itemCheck) throw Error("One of item have invalid item id");

      if(results[resultIndex].count > itemCheck.maxCount) results[resultIndex].count = itemCheck.maxCount;
    }

    if(recipeData.updateBuffer) {
      await this.ingredientBufferRepository.remove(recipeData.updateBuffer.ingredients);
      await this.resultBufferRepository.remove(recipeData.updateBuffer.results);
    }

    const ingredientsBufferData: IngredientToRecipeBuffer[] = [];
    const resultsBufferData: ResultToRecipeBuffer[] = [];
    const recipeDataBuffer = await this.recipeDataBufferRepository.save({ ...recipeData.updateBuffer, currentVersion: recipeData });

    ingredients.map(async ({ count, item }, index) => {
      ingredientsBufferData[index] = await this.ingredientBufferRepository.save({ count, item, recipe: recipeDataBuffer });
    });

    results.map(async ({ count, dropChance, item }, index) => {
      resultsBufferData[index] = await this.resultBufferRepository.save({ count, dropChance, item, recipe: recipeDataBuffer });
    });

    return this.recipeDataRepository.save({ ...recipeData, updateBuffer: recipeDataBuffer });
  }

  public async changeRotationStatus(id: number): Promise<RecipeData> {
    const recipeData = await this.recipeDataRepository.findOne({ where: { id } });

    if(!recipeData) throw Error("There is no recipe with this id");

    return this.recipeDataRepository.save({ ...recipeData, inRotation: !recipeData.inRotation });
  }

  public async removeUpdates(id: number): Promise<RecipeDataBuffer> {
    const updateBuffer = await this.recipeDataBufferRepository.findOne({
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

    return this.recipeDataBufferRepository.remove(updateBuffer);
  }

  public async deleteRecipeData(id: number): Promise<RecipeData> {
    const recipe = await this.recipeDataRepository.findOne({
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
      await this.recipeDataBufferRepository.remove(recipe.updateBuffer);
    }

    if(!recipe) throw Error("There is no Recipe with this id");

    await this.ingredientRepository.remove(recipe.ingredients);
    await this.resultRepository.remove(recipe.results);

    return this.recipeDataRepository.remove(recipe);
  }
}
