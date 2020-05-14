import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ItemData } from "../item";
import { RecipeDataBuffer } from "./recipeDataBuffer";

@Entity("ResultToRecipeBuffer")
export class ResultToRecipeBuffer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  count!: number;

  @Column()
  dropChance!: number;

  @ManyToOne(type => ItemData, item => item.resultOf)
  item: ItemData;

  @ManyToOne(type => RecipeDataBuffer, recipe => recipe.ingredients)
  recipe: RecipeDataBuffer;
}
