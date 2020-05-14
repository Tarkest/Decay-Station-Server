import { Request, Response } from "express";
import { Controller, GET, POST, DELETE, PUT } from "../../shared/decorators";
import TypeService from "../../services/recipesData";
import * as config from "../../../config.json";
import jwt = require("express-jwt");

@Controller('/api/admin', jwt({ secret: config.jwtSecret }))
export class RecipesData {
    private typeService: TypeService = new TypeService();

    @GET({path: '/recipes'})
    public async getRecipes(req: Request, res: Response) {
        try {
          res.send(await this.typeService.getRecipesData());
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @POST({path: '/recipes'})
    public async addRecipeData(req: Request, res: Response) {
        try {
          const { ingredients, results } = req.body;
          res.send(await this.typeService.createRecipe(ingredients, results));
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @PUT({path: '/recipes'})
    public async updateRecipe(req: Request, res: Response) {
        try {
          const { id, ingredients, results } = req.body;
          res.send(await this.typeService.saveUpdateForRecipe(id, ingredients, results));
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @PUT({path: '/recipes/rotation'})
    public async changeRotation(req: Request, res: Response) {
        try {
          const { id } = req.body;
          res.send(await this.typeService.changeRotationStatus(id));
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @DELETE({path: '/recipes'})
    public async deleteRecipe(req: Request, res: Response) {
        try {
          const { id } = req.query;
          res.send(await this.typeService.deleteRecipeData(id));
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }

    @DELETE({path: '/recipes/update'})
    public async deleteRecipeUpdate(req: Request, res: Response) {
        try {
          const { id } = req.query;
          res.send(await this.typeService.removeUpdates(id));
        } catch (error) {
          res.status(403).send(error.toString());
        }
    }
}
