import { Column, Entity, ManyToOne, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { BaseIdNameEntity } from "../baseEntities";
import { ItemsType, ItemsRarity } from "../сonstants";
import { ItemDataBuffer } from "./itemDataBuffer";
import { IngredientToRecipe, ResultToRecipe } from "../recipes";

@Entity("ItemData")
export class ItemData extends BaseIdNameEntity {
    @Column()
    inRotation: boolean;

    @Column()
    maxCount: number;

    @ManyToOne(type => ItemsType, itemsType => itemsType.items, { onDelete: "SET NULL" })
    type: ItemsType;

    @ManyToOne(type => ItemsRarity, itemsRarity => itemsRarity.items, { onDelete: "SET NULL" })
    rarity: ItemsRarity;

    @OneToOne(type => ItemDataBuffer, buffer => buffer.currentVersion, { onDelete: "SET NULL" })
    @JoinColumn()
    updateBuffer: ItemDataBuffer;

    @OneToMany(type => IngredientToRecipe, recipe => recipe.item)
    ingredientOf: IngredientToRecipe[];

    @OneToMany(type => ResultToRecipe, recipe => recipe.item)
    resultOf: ResultToRecipe[];
}