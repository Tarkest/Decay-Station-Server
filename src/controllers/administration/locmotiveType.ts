import { Request, Response } from "express";
import { Controller, GET, POST, DELETE, PUT } from "../../sharedUtilities/decorators";
import TypeService from "../../services/locomotiveType";
import * as config from "../../../config.json";
import jwt = require("express-jwt");

@Controller('/api/admin', jwt({ secret: config.jwtSecret }))
export class LocomotiveType {
    private typeService: TypeService = new TypeService();

    @GET({path: '/locomotives'})
    public async getLocomotives(req: Request, res: Response) {
        try {
            res.send(await this.typeService.getLocomotivesTypes());
        } catch (error) {
            res.status(400).send(error.toString());
        }
    }

    @POST({path: '/locomotives'})
    public async addLocomotiveType(req: Request, res: Response) {
        try {
            const { name } = req.body;
            res.send(await this.typeService.createLocomotiveType(name));
        } catch (error) {
            res.status(422).send(error.toString());
        }
    }

    @PUT({path: '/locomotives'})
    public async updateLocomotive(req: Request, res: Response) {
        try {
            res.send(await this.typeService.updateLocomotiveType(req.body));
        } catch (error) {            
            res.status(422).send(error.toString());
        }
    }

    @DELETE({ path: '/locomotives'})
    public async deleteLocomotive(req: Request, res: Response) {
        try {

        } catch (error) {
            
        }
    }
}