import * as Boom from 'boom'
import {Request, ServerRoute} from "hapi";
import UserService from "../../services/user";
import {IController} from "../controller";

export class UserController implements IController {
    service = new UserService();
    routeParams: Array<ServerRoute> = [
        {
            method: "GET",
            path: "/api/users",
            handler: this.getAll.bind(this)
        },
        {
            method: "POST",
            path: "/api/users",
            handler: this.create.bind(this)
        },
        {
            method: "GET",
            path: "/api/users/{id}",
            handler: this.getOne.bind(this)
        },
        {
            method: "DELETE",
            path: "/api/users/{id}",
            handler: this.delete.bind(this)
        },
        {
            method: "GET",
            path: "/api/users/{id}/orders",
            handler: this.getOneWithOrders.bind(this)
        },
    ];

    constructor(server) {
        server.route(this.routeParams)
    }

    async getAll(r, h) {

    }

    async getOne(r, h) {
        const {id} = r.params;
        try {
            return await this.service.getUser(id);
        } catch (e) {
            console.log(e)
        }
    }

    async getOneWithOrders(r, h) {
    }

    async create(r: Request, h) {
    }

    async update() {
    }

    async delete(r) {
    }
}
