import { Request, Response } from "express";
import { Controller, POST } from "../../sharedUtilities/decorators";
import AdministrationService from "../../services/administration";
import * as config from "../../../config.json";
import jwt = require("express-jwt");

@Controller('/api/admin', jwt({ secret: config.jwtSecret }).unless({ path: ['/api/admin/login'] }))
export class AdministrationController {
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

export * from "./locmotiveType";
export * from "./itemType";
export * from "./constants";