import { Request, Response } from "express";
import { Controller, GET, POST, DELETE, PUT } from "../../shared/decorators";
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
      const itemsTypes = await this.typeService.getItemsTypes();
      res.send({ items: itemsTypes });
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

  @DELETE({path: '/itemstypes'})
  public async deleteItemsType(req: Request, res: Response) {
    try {
      const { id } = req.query;
      res.send(await this.typeService.deleteItemsType(Number(id)));
    } catch (error) {
      res.status(422).send(error.toString());
    }
  }

  // Buildings Types
  @GET({path: '/buildingstypes'})
  public async getBuildingsTypes(req: Request, res: Response) {
    try {
      const buildingsTypes = await this.typeService.getBuildingsTypes();
      res.send({ items: buildingsTypes });
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

  @DELETE({path: '/buildingstypes'})
  public async deleteBuildingsType(req: Request, res: Response) {
    try {
      const { id } = req.query;
      res.send(await this.typeService.deleteBuildingsType(Number(id)));
    } catch (error) {
      res.status(422).send(error.toString());
    }
  }

  // Items Rarities
  @GET({path: '/itemsrarities'})
  public async getItemsRarities(req: Request, res: Response) {
    try {
      const itemsRarities = await this.typeService.getItemsRarities();
      res.send({ items: itemsRarities });
    } catch (error) {
      res.status(400).send(error.toString());
    }
  }

  @POST({path: '/itemsrarities'})
  public async addItemsRarity(req: Request, res: Response) {
    try {
      const { name } = req.body;
      res.send(await this.typeService.createItemsRarity(name));
    } catch (error) {
      res.status(422).send(error.toString());
    }
  }

  @DELETE({path: '/itemsrarities'})
  public async deleteItemsRarity(req: Request, res: Response) {
    try {
      const { id } = req.query;
      res.send(await this.typeService.deleteItemsRarity(Number(id)));
    } catch (error) {
      res.status(422).send(error.toString());
    }
  }

  // Map Environments
  @GET({path: '/environments'})
  public async getEnvironmentsTypes(req: Request, res: Response) {
    try {
      const itemsRarities = await this.typeService.getEnvironmentsTypes();
      res.send({ items: itemsRarities });
    } catch (error) {
      res.status(400).send(error.toString());
    }
  }

  @POST({path: '/environments'})
  public async addEnvironmentsType(req: Request, res: Response) {
    try {
      const { name } = req.body;
      res.send(await this.typeService.createEnvironmentsType(name));
    } catch (error) {
      res.status(422).send(error.toString());
    }
  }

  @DELETE({path: '/environments'})
  public async deleteEnvironmentsType(req: Request, res: Response) {
    try {
      const { id } = req.query;
      res.send(await this.typeService.deleteEnvironmentsType(Number(id)));
    } catch (error) {
      res.status(422).send(error.toString());
    }
  }
}
