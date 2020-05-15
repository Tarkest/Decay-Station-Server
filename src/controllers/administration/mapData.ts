import { Request, Response } from "express";
import { Controller, GET, POST, DELETE, PUT } from "../../shared/decorators";
import TypeService from "../../services/mapData";
import * as config from "../../../config.json";
import jwt = require("express-jwt");

@Controller('/api/admin', jwt({ secret: config.jwtSecret }))
export class MapData {
    private typeService: TypeService = new TypeService();

    @GET({path: '/map'})
    public async getSectors(req: Request, res: Response) {
        try {
          res.send(await this.typeService.getSectorsData());
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @POST({path: '/map'})
    public async addBuildingData(req: Request, res: Response) {
        try {
          const { name, environmentId, positionX, positionY } = req.body;
          res.send(await this.typeService.createMapSector(name, environmentId, positionX, positionY));
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @PUT({path: '/map'})
    public async updateBuilding(req: Request, res: Response) {
        try {
          const { id, name, environmentId } = req.body;
          res.send(await this.typeService.saveUpdateForRecipe(id, name, environmentId ));
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @DELETE({path: '/map'})
    public async deleteBuilding(req: Request, res: Response) {
        try {
          const { id } = req.query;
          res.send(await this.typeService.deleteSectorData(Number(id)));
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @DELETE({path: '/map/update'})
    public async deleteBuildingUpdate(req: Request, res: Response) {
        try {
          const { id } = req.query;
          res.send(await this.typeService.removeUpdates(Number(id)));
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }
}
