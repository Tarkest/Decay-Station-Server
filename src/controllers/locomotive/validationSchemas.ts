import {number, object, string} from "joi";

export const addLocomotive = object({
    name: string(),
    typeId: number().default(1),
});

export const updateLocomotive = object({
    name: string(),
});
