import { Request, Response } from "express";
import { Controller, GET, POST, DELETE, PUT } from "../../sharedUtilities/decorators";
import TypeService from "../../services/locomotiveType";
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
    public async addLocomotiveType(req: Request, res: Response) {
        try {
            const { name, upgrades } = req.body;
            res.send(await this.typeService.createLocomotiveType(name, upgrades));
        } catch (error) {
            res.status(403).send(error.toString());
        }
    }

    @PUT({path: '/locomotives'})
    public async updateLocomotive(req: Request, res: Response) {
        try {
            const { id, upgrades } = req.body;
            res.send(await this.typeService.saveUpdateForLocomotive(id, upgrades));
        } catch (error) {            
            res.status(403).send(error.toString());
        }
    }

    @PUT({path: '/locomotives/rotation'})
    public async chanegRotation(req: Request, res: Response) {
        try {
            const { id } = req.body;
            res.send(await this.typeService.changeRotationStatus(id));
        } catch (error) {            
            res.status(403).send(error.toString());
        }
    }

    @DELETE({ path: '/locomotives'})
    public async deleteLocomotive(req: Request, res: Response) {
        try {
            res.status(404).send();
        } catch (error) {
            res.status(403).send(error.toString());
        }
    }

    @DELETE({ path: '/locomotives/update'})
    public async deleteLocomotiveUpdate(req: Request, res: Response) {
        try {
            const { id } = req.query;
            res.send(await this.typeService.removeUpdates(id));
        } catch (error) {
            res.status(403).send(error.toString());
        }
    }
}
