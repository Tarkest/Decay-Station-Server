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
      const itemsTypes = await this.typeService.getItemsTypes();
      res.send({ data: JSON.stringify({ items: itemsTypes }) });
    } catch (error) {
      res.status(400).send({ error: error.toString() });
    }
  }

  @POST({path: '/itemstypes'})
  public async addItemsType(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const createdItemsType = await this.typeService.createItemsType(name);
      res.send({ data: JSON.stringify(createdItemsType) });
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  }

  @DELETE({ path: '/itemstypes'})
  public async deleteItemsType(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const deletedItemsType = await this.typeService.deleteItemsType(id);
      res.send({ data: JSON.stringify(deletedItemsType) });
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  }

  // Buildings Types
  @GET({path: '/buildingstypes'})
  public async getBuildingsTypes(req: Request, res: Response) {
    try {
      const buildingsTypes = await this.typeService.getBuildingsTypes();
      res.send({ data: JSON.stringify({ items: buildingsTypes }) });
    } catch (error) {
      res.status(400).send({ error: error.toString() });
    }
  }

  @POST({path: '/buildingstypes'})
  public async addBuildingsType(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const newBuildingType = await this.typeService.createBuildingsType(name);
      res.send({ data: JSON.stringify(newBuildingType) });
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  }

  @DELETE({ path: '/buildingstypes'})
  public async deleteBuildingsType(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const deletedBuildingType = await this.typeService.deleteBuildingsType(id);
      res.send({ data: JSON.stringify(deletedBuildingType) });
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  }

  // Items Rarities
  @GET({path: '/itemsrarities'})
  public async getItemsRarities(req: Request, res: Response) {
    try {
      const itemsRarities = await this.typeService.getItemsRarities();
      res.send({ data: JSON.stringify({ items: itemsRarities }) });
    } catch (error) {
      res.status(400).send({ error: error.toString() });
    }
  }

  @POST({path: '/itemsrarities'})
  public async addItemsRarity(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const newItemsRarity = await this.typeService.createItemsRarity(name);
      res.send({ data: JSON.stringify(newItemsRarity) });
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  }

  @DELETE({ path: '/itemsrarities'})
  public async deleteItemsRarity(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const deletedItemsRarity = await this.typeService.deleteItemsRarity(id);
      res.send({ data: JSON.stringify(deletedItemsRarity) });
    } catch (error) {
      res.status(422).send({ error: error.toString() });
    }
  }
}
