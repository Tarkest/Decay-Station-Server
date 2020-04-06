import { Request, Response } from "express";
import { Controller, GET, POST, DELETE, PUT } from "../../sharedUtilities/decorators";
import TypeService from "../../services/ItemData";
import * as config from "../../../config.json";
import jwt = require("express-jwt");

@Controller('/api/admin', jwt({ secret: config.jwtSecret }))
export class ItemData {

    // Services

    private typeService: TypeService = new TypeService();

    @GET({path: '/items'})
    public async getItemsTypes(req: Request, res: Response) {
        try {
            res.send(await this.typeService.getItemsData());
        } catch (error) {
            res.status(403).send(error.toString());
        }
    }

    @POST({path: '/items'})
    public async addItemData(req: Request, res: Response) {
        try {
            const { name, maxCount, type, rarity } = req.body;
            res.send(await this.typeService.createItemData(name, maxCount, type.id, rarity.id));
        } catch (error) {
            res.status(403).send(error.toString());
        }
    }

    @PUT({path: '/items'})
    public async updateItemData(req: Request, res: Response) {
        try {
            const { id, maxCount, type, rarity } = req.body;
            res.send(await this.typeService.saveUpdateForItemData(id, maxCount, type.id, rarity.id));
        } catch (error) {
            res.status(403).send(error.toString());
        }
    }

    @PUT({path: '/items/rotation'})
    public async changeRotation(req: Request, res: Response) {
        try {
            const { id } = req.body;
            res.send(await this.typeService.changeRotationStatus(id));
        } catch (error) {
            res.status(403).send(error.toString());
        }
    }

    @DELETE({path: '/items'})
    public async deleteItemData(req: Request, res: Response) {
        try {
            res.status(404).send();
        } catch (error) {
            res.status(403).send(error.toString());
        }
    }

    @DELETE({path: '/items/update'})
    public async deleteItemDataUpdate(req: Request, res: Response) {
        try {
            const { id } = req.query;
            res.send(await this.typeService.removeUpdate(id));
        } catch (error) {
            res.status(403).send(error.toString());
        }
    }
}
