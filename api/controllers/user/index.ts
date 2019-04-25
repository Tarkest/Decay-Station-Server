import * as Boom from 'boom'
import {Request, ServerRoute} from "hapi";
import UserService from "../../services/user";
import {IController} from "../controller";

export class UserController implements IController {
    service = new UserService();
    routeParams: Array<ServerRoute> = [
        {
            method: "GET",
            path: "/api/users/{id}",
            handler: this.getOne.bind(this)
        },
        {
            method: "GET",
            path: "/api/users/{id}/info",
            handler: this.getInfo.bind(this)
        }
    ];

    constructor(server) {
        server.route(this.routeParams)
    }

    async getOne(r, h) {
        const {id} = r.params;
        try {
            return await this.service.getUser(id);
        } catch (e) {
            console.log(e)
        }
    }

    async getInfo(r, h) {
        const {id} = r.params;
        try {
            return await this.service.getAlluserInfo(id);
        } catch (e) {
            console.log(e)
        }
    }

    async getAll(r, h) {

    }

    async create(r: Request, h) {
    }

    async update() {
    }

    async delete(r) {
    }
}
