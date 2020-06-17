import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ItemData } from "../itemData";
import { RecipeData } from "./recipeData";

@Entity()
export class IngredientToRecipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  count!: number;

  @ManyToOne(type => ItemData, item => item.ingredientOf, { onDelete: "SET NULL" })
  item: ItemData;

  @ManyToOne(type => RecipeData, recipe => recipe.ingredients, { onDelete: "SET NULL" })
  recipe: RecipeData;
}
