/* tslint:disable */
import 'reflect-metadata';
import * as Controllers from './src/controllers';
import {Router} from "express";

export const setup = app => {
    Object.keys(Controllers).map(key => {
        const instance = new Controllers[key]();
        console.log(`Building \x1b[33m${instance.constructor.name}\x1b[0m controller`);
        const controllerMiddlewares = Reflect.getMetadata('controllerMiddlewares', instance);
        const globalPath = Reflect.getMetadata('prefix', instance);
        const routes = Reflect.getMetadata('routes', instance);

        if (controllerMiddlewares) app.use(globalPath, controllerMiddlewares);
        const router = Router();
        routes.map(route => {
            router[route.method](route.path, ...route.middlewares, instance[route.handler].bind(instance));
        });
        app.use(globalPath, router);
    });
};