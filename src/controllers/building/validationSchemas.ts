import {number, object} from "joi";

export const addActionSchema = object({
    itemId: number().integer(),
    itemsCapacity: number().integer(),
    recipeId: number().integer(),
});
