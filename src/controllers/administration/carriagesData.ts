import { Request, Response } from "express";
import { Controller, GET, POST, DELETE, PUT } from "../../sharedUtilities/decorators";
import TypeService from "../../services/carriageData";
import * as config from "../../../config.json";
import jwt = require("express-jwt");

@Controller('/api/admin', jwt({ secret: config.jwtSecret }))
export class CarriageData {

    // Services

    private typeService: TypeService = new TypeService();

    @GET({path: '/carriages'})
    public async getItemsTypes(req: Request, res: Response) {
        try {
          res.send(await this.typeService.getCarriagesTypes());
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @POST({path: '/carriages'})
    public async addItemData(req: Request, res: Response) {
        try {
          const { name, storageCapacity, crewCapacity, assemblyItems, buildingSlots } = req.body;
          res.send(await this.typeService.createCarriageData(name, storageCapacity, crewCapacity, assemblyItems, buildingSlots ));
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @PUT({path: '/carriages'})
    public async updateItemData(req: Request, res: Response) {
        try {
          res.status(404).send();
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @PUT({path: '/carriages/rotation'})
    public async changeRotation(req: Request, res: Response) {
        try {
          const { id } = req.body;
          res.send(await this.typeService.changeRotationStatus(id));
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @DELETE({path: '/carriages'})
    public async deleteItemData(req: Request, res: Response) {
        try {
          res.status(404).send();
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @DELETE({path: '/carriages/update'})
    public async deleteItemDataUpdate(req: Request, res: Response) {
        try {
          const { id } = req.query;
          res.send(await this.typeService.removeUpdates(id));
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }
}
