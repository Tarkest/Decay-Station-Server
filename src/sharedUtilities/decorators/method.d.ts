import {RequestHandler} from "express";

declare module decorators {
    interface IMethodDecoratorOptions {
        path: string;
        middlewares?: RequestHandler[];
    }
}
