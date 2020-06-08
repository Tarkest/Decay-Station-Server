import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ItemData } from "../itemData";
import { RecipeDataBuffer } from "./recipeDataBuffer";

@Entity()
export class IngredientToRecipeBuffer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  count!: number;

  @ManyToOne(type => ItemData, item => item.ingredientOf, { onDelete: "SET NULL" })
  item: ItemData;

  @ManyToOne(type => RecipeDataBuffer, recipe => recipe.ingredients, { onDelete: "SET NULL" })
  recipe: RecipeDataBuffer;
}
