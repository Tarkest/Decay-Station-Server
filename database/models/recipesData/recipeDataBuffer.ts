import { Entity, BaseEntity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { IngredientToRecipeBuffer } from "./ingredientToRecipeBuffer";
import { ResultToRecipeBuffer } from "./resultToRecipeBuffer";
import { RecipeData } from "./recipeData";

@Entity()
export class RecipeDataBuffer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(type => IngredientToRecipeBuffer, ingredient => ingredient.recipe, { onDelete: "CASCADE" })
  ingredients: IngredientToRecipeBuffer[];

  @OneToMany(type => ResultToRecipeBuffer, result => result.recipe, { onDelete: "CASCADE" })
  results: ResultToRecipeBuffer[];

  @OneToOne(type => RecipeData, current => current.updateBuffer, { onDelete: "CASCADE" })
  @JoinColumn()
  currentVersion: RecipeData;
}
