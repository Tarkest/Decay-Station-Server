import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ItemData } from "../item";
import { RecipeData } from "./recipeData";

@Entity("ResultToRecipe")
export class ResultToRecipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  count!: number;

  @Column()
  dropChance!: number;

  @ManyToOne(type => ItemData, item => item.resultOf, { onDelete: "SET NULL" })
  item: ItemData;

  @ManyToOne(type => RecipeData, recipe => recipe.ingredients, { onDelete: "SET NULL" })
  recipe: RecipeData;
}
