import { Request, Response } from "express";
import { Controller, POST } from "../../shared/decorators";
import AdministrationService from "../../services/administration";
import * as config from "../../../config.json";
import jwt = require("express-jwt");

@Controller('/api/admin', jwt({ secret: config.jwtSecret }).unless({ path: ['/api/admin/login'] }))
export class Administration {
  private adminService: AdministrationService = new AdministrationService();

  @POST({path: '/login'})
  public async login(req: Request, res: Response) {
    const { login, password } = req.body;
    try {
      const token = await this.adminService.checkUser(login, password);
      res.send(token);
    } catch {
      res.status(401).send('Wrong credentials');
    }
  }
}

export * from "./locomotiveData";
export * from "./itemData";
export * from "./constants";
export * from "./carriagesData";
export * from "./recipesData";
export * from "./buildingsData";
export * from "./mapData";
