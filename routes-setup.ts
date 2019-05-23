import 'reflect-metadata';
import * as Controllers from './src/controllers'
import {Router} from "express";

export const setup = app => {
    Object.keys(Controllers).map(key => {
        const instance = new Controllers[key]();
        console.log(`Building ${instance.constructor.name} controller`);

        const globalPath = Reflect.getMetadata('prefix', instance);
        const routes = Reflect.getMetadata('routes', instance);

        const router = Router();
        routes.map(route => {
            router[route.method](route.path, instance[route.handler].bind(instance))
        });
        app.use(globalPath, router)
    })
};