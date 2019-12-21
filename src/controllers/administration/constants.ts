import { Request, Response } from "express";
import { Controller, GET, POST, DELETE, PUT } from "../../sharedUtilities/decorators";
import TypeService from "../../services/constants";
import * as config from "../../../config.json";
import jwt = require("express-jwt");

@Controller('/api/admin/constants', jwt({ secret: config.jwtSecret }))
export class Constants {
    // Services
    private typeService: TypeService = new TypeService();


    // Items types
    @GET({path: '/itemstypes'})
    public async getItemsTypes(req: Request, res: Response) {
      try {
        res.send(await this.typeService.getItemsTypes());
      } catch (error) {
        res.status(400).send(error.toString());
      }
    }

    @POST({path: '/itemstypes'})
    public async addItemsType(req: Request, res: Response) {
      try {
        const { name } = req.body;
        res.send(await this.typeService.createItemsType(name));
      } catch (error) {
        res.status(422).send(error.toString());
      }
    }

    @DELETE({ path: '/itemstypes'})
    public async deleteItemsType(req: Request, res: Response) {
      try {
        const { id } = req.query;
        res.send(await this.typeService.deleteItemsType(id));
      } catch (error) {
        res.status(422).send(error.toString());
      }
    }

    // Buildings Types
    @GET({path: '/buildingstypes'})
    public async getBuildingsTypes(req: Request, res: Response) {
      try {
        res.send(await this.typeService.getBuildingsTypes());
      } catch (error) {
        res.status(400).send(error.toString());
      }
    }

    @POST({path: '/buildingstypes'})
    public async addBuildingsType(req: Request, res: Response) {
      try {
        const { name } = req.body;
        res.send(await this.typeService.createBuildingsType(name));
      } catch (error) {
        res.status(422).send(error.toString());
      }
    }

    @DELETE({ path: '/buildingstypes'})
    public async deleteBuildingsType(req: Request, res: Response) {
      try {
        const { id } = req.query;
        res.send(await this.typeService.deleteBuildingsType(id));
      } catch (error) {
        res.status(422).send(error.toString());
      }
    }
}
