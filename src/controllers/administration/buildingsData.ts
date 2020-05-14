import { Request, Response } from "express";
import { Controller, GET, POST, DELETE, PUT } from "../../shared/decorators";
import TypeService from "../../services/buildingData";
import * as config from "../../../config.json";
import jwt = require("express-jwt");

@Controller('/api/admin', jwt({ secret: config.jwtSecret }))
export class BuildingsData {
    private typeService: TypeService = new TypeService();

    @GET({path: '/buildings'})
    public async getBuildings(req: Request, res: Response) {
        try {
          res.send(await this.typeService.getBuildingsTypes());
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @POST({path: '/buildings'})
    public async addBuildingData(req: Request, res: Response) {
        try {
          const {name, size, typeId, recipes } = req.body;
          res.send(await this.typeService.createBuildingData(name, size as number, typeId as number, recipes));
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @PUT({path: '/buildings'})
    public async updateBuilding(req: Request, res: Response) {
        try {
          const { id, size, typeId, recipes } = req.body;
          res.send(await this.typeService.saveUpdateForBuilding(id as number, size as number, typeId as number, recipes));
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @DELETE({path: '/buildings'})
    public async deleteBuilding(req: Request, res: Response) {
        try {
          const { id } = req.query;
          res.send(await this.typeService.deleteBuildingData(id as number));
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @DELETE({path: '/buildings/update'})
    public async deleteBuildingUpdate(req: Request, res: Response) {
        try {
          const { id } = req.query;
          res.send(await this.typeService.removeUpdates(id as number));
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }
}
