import {setupMethod, setupController} from './helpers';
import {decorators} from "./method";
import IMethodDecoratorOptions = decorators.IMethodDecoratorOptions;

export const Controller = setupController;

export const GET = (options: IMethodDecoratorOptions) => setupMethod('get')(options);
export const POST = (options: IMethodDecoratorOptions) => setupMethod('post')(options);
export const PUT = (options: IMethodDecoratorOptions) => setupMethod('put')(options);
export const DELETE = (options: IMethodDecoratorOptions) => setupMethod('delete')(options);
