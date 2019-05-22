import * as moment from 'moment'
import {Item, Recipe, TimeStamp, TimeStampType} from "../../../database/models";
import {getRepository} from "typeorm";

export class TimeStampService {
    static async create({itemId, itemsCapacity, recipeId}) {
        const stamp = new TimeStamp();
        stamp.item = await Item.findOne(itemId);
        stamp.type = await TimeStampType.findOne(1);
        stamp.recipe = await Recipe.findOne(recipeId);
        stamp.startDate = moment();
        stamp.endDate = moment().add(2, 'hours');
        stamp.itemsCapacity = itemsCapacity;
        stamp.counter = 100;

        return stamp.save();
    }
}