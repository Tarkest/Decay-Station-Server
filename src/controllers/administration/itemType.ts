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
            const { name, maxCount, type, rarity } = req.body;
            res.send(await this.typeService.createItemType(name, maxCount, type.id, rarity.id));
        } catch (error) {
            res.status(422).send(error.toString());
        }
    }

    @PUT({path: '/items'})
    public async updateItemType(req: Request, res: Response) {
        try {
            const { id, maxCount, type, rarity } = req.body;
            res.send(await this.typeService.saveUpdateForItemType(id, maxCount,  type.id, rarity.id));
        } catch (error) {            
            res.status(422).send(error.toString());
        }
    }

    @PUT({path: '/items/rotation'})
    public async changeRotation(req: Request, res: Response) {
        try {
            const { id } = req.body;
            res.send(await this.typeService.changeRotationStatus(id));
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

    @DELETE({ path: '/items/update'})
    public async deleteItemTypeUpdate(req: Request, res: Response) {
        try {
            const { id } = req.query;
            res.send(await this.typeService.removeUpdate(id));
        } catch (error) {
            res.status(422).send(error.toString());
        }
    }
}
