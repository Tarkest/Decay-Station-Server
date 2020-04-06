import 'reflect-metadata';
import {RequestHandlerParams} from "express-serve-static-core";
import {decorators} from "./method";
import IMethodDecoratorOptions = decorators.IMethodDecoratorOptions;

const setMetadata = (route, target) => {
    if (!Reflect.hasMetadata('routes', target)) {
        Reflect.defineMetadata('routes', [route], target);
        return;
    }
    const routes = Reflect.getMetadata('routes', target);
    Reflect.defineMetadata('routes', [...routes, route], target);
};

export const setupMethod = method => (options: IMethodDecoratorOptions) => (target, handler) => {
    const {path, middlewares = []} = options;
    const route = {
        handler,
        method,
        middlewares,
        path,
    };
    setMetadata(route, target);
};

export const setupController = (globalPath: string, middlewares?: RequestHandlerParams[]) => target => {
    Reflect.defineMetadata('prefix', globalPath, target.prototype);
    if (middlewares) Reflect.defineMetadata('controllerMiddlewares', middlewares, target.prototype);
};
