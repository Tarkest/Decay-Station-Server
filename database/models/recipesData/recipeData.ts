import { Entity, BaseEntity, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn, Column } from "typeorm";
import { IngredientToRecipe } from "./ingredientToRecipe";
import { ResultToRecipe } from "./resultToRecipe";
import { RecipeDataBuffer } from "./recipeDataBuffer";

@Entity()
export class RecipeData extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  inRotation: boolean;

  @OneToMany(type => IngredientToRecipe, ingredient => ingredient.recipe, { onDelete: "CASCADE" })
  ingredients: IngredientToRecipe[];

  @OneToMany(type => ResultToRecipe, result => result.recipe, { onDelete: "CASCADE" })
  results: ResultToRecipe[];

  @OneToOne(type => RecipeDataBuffer, buffer => buffer.currentVersion, { onDelete: "SET NULL" })
  @JoinColumn()
  updateBuffer: RecipeDataBuffer;
}
