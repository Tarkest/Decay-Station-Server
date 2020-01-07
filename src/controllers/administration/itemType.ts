import { Request, Response } from "express";
import { Controller, GET, POST, DELETE, PUT } from "../../sharedUtilities/decorators";
import TypeService from "../../services/itemType";
import * as config from "../../../config.json";
import jwt = require("express-jwt");

@Controller('/api/admin', jwt({ secret: config.jwtSecret }))
export class ItemType {
    //Services
    private typeService: TypeService = new TypeService();

    @GET({path: '/items'})
    public async getItemsTypes(req: Request, res: Response) {
        try {
            res.send(await this.typeService.getItemsTypes());
        } catch (error) {
            res.status(400).send(error.toString());
        }
    }

    @POST({path: '/items'})
    public async addItemType(req: Request, res: Response) {
        try {
            const { name, maxCount, typeId, rarityId } = req.body;
            res.send(await this.typeService.createItemType(name, maxCount, typeId, rarityId));
        } catch (error) {
            res.status(422).send(error.toString());
        }
    }

    @PUT({path: '/items'})
    public async updateItemType(req: Request, res: Response) {
        try {
            const { id, maxCount, typeId, rarityId } = req.body;
            res.send(await this.typeService.saveUpdateForItemType(id, maxCount,  typeId, rarityId));
        } catch (error) {            
            res.status(422).send(error.toString());
        }
    }

    @DELETE({ path: '/items'})
    public async deleteItemType(req: Request, res: Response) {
        try {

        } catch (error) {
            
        }
    }
}
