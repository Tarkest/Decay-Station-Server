import { Request, Response } from "express";
import { Controller, GET, POST, DELETE, PUT } from "../../sharedUtilities/decorators";
import TypeService from "../../services/locomotiveData";
import * as config from "../../../config.json";
import jwt = require("express-jwt");

@Controller('/api/admin', jwt({ secret: config.jwtSecret }))
export class Locomotive {
    private typeService: TypeService = new TypeService();

    @GET({path: '/locomotives'})
    public async getLocomotives(req: Request, res: Response) {
        try {
            res.send(await this.typeService.getLocomotivesTypes());
        } catch (error) {
            res.status(403).send(error.toString());
        }
    }

    @POST({path: '/locomotives'})
    public async addLocomotiveData(req: Request, res: Response) {
        try {
            const { name, maxLevel, upgradesRecipes, buildingSlots } = req.body;
            console.log(req.body);
            res.send(await this.typeService.createLocomotiveData(name, maxLevel, upgradesRecipes, buildingSlots));
        } catch (error) {
            res.status(403).send(error.toString());
        }
    }

    @PUT({path: '/locomotives'})
    public async updateLocomotive(req: Request, res: Response) {
        try {
            const { id, maxLevel, upgradesRecipes, buildingSlots } = req.body;
            res.send(await this.typeService.saveUpdateForLocomotive(id, maxLevel, upgradesRecipes, buildingSlots));
        } catch (error) {
            res.status(403).send(error.toString());
        }
    }

    @PUT({path: '/locomotives/rotation'})
    public async changeRotation(req: Request, res: Response) {
        try {
            const { id } = req.body;
            res.send(await this.typeService.changeRotationStatus(id));
        } catch (error) {
            res.status(403).send(error.toString());
        }
    }

    @DELETE({path: '/locomotives'})
    public async deleteLocomotive(req: Request, res: Response) {
        try {
            res.status(404).send();
        } catch (error) {
            res.status(403).send(error.toString());
        }
    }

    @DELETE({path: '/locomotives/update'})
    public async deleteLocomotiveUpdate(req: Request, res: Response) {
        try {
            const { id } = req.query;
            res.send(await this.typeService.removeUpdates(id));
        } catch (error) {
            res.status(403).send(error.toString());
        }
    }
}
