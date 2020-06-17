import { Request, Response } from "express";
import { Controller, POST, GET } from "../../shared/decorators";
import AccountService from "../../services/accountService";
import * as config from "../../../config.json";
import jwt = require("express-jwt");

@Controller("/api", jwt({ secret: config.jwtSecret }).unless({ path: ["/api/login"] }))
export class Main {
  private accountService: AccountService = new AccountService();

  @POST({path: "/login"})
  public async login(req: Request, res: Response) {
    const { googleId } = req.body;
    try {
      res.send(await this.accountService.login(googleId));
    } catch (error){
      res.status(401).send("Wrong credentials");
    }
  }

  @GET({path: "/getAccountInfo"})
  public async getAccountInfo(req: Request, res: Response) {
    const { userId } = req.user;
    try {
      res.send(await this.accountService.getAccountData(userId));
    } catch(error) {
      res.status(401).send(error.message);
    }
  }
}

