import {Request, ServerRoute, ResponseToolkit} from "hapi";

export interface IController {
    getAll(r: Request, h: ResponseToolkit): Promise<any>

    getOne(r: Request, h: ResponseToolkit): Promise<any>

    create(r: Request, h: ResponseToolkit): Promise<any>

    update(r: Request, h: ResponseToolkit): Promise<any>

    delete(r: Request, h: ResponseToolkit): Promise<any>

    routeParams: Array<ServerRoute>

    service: object
}
