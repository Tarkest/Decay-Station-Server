
import 'reflect-metadata';
import * as Controllers from './src/controllers';
import {Router} from "express";

export const setup = app => {
  Object.keys(Controllers).map(key => {
    const instance = new Controllers[key]();
    // tslint:disable-next-line: no-console
    console.log(`Building ${instance.constructor.name} controller`);
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