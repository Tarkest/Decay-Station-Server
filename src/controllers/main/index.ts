import { Request, Response } from "express";
import { Controller, POST } from "../../shared/decorators";
import AccountService from "../../services/accountService";
import * as config from "../../../config.json";
import jwt = require("express-jwt");

@Controller('/api', jwt({ secret: config.jwtSecret }).unless({ path: ['/api/login'] }))
export class Main {
  private accountService: AccountService = new AccountService();

  @POST({path: '/login'})
  public async login(req: Request, res: Response) {
    const { googleId } = req.body;
    try {
      res.send(await this.accountService.login(googleId));
    } catch (error){
      console.log(error);
      res.status(401).send('Wrong credentials');
    }
  }
}

