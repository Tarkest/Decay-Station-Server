import {number, object, string} from "joi";

export const addCarriage = object({
    name: string(),
    typeId: number().default(1),
});
