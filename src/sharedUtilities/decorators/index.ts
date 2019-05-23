import {setupMethod, setupController} from './helpers'

export const Controller = setupController;

export const GET = path => setupMethod('get')(path);
export const POST = path => setupMethod('post')(path);
export const PUT = path => setupMethod('put')(path);
export const DELETE = path => setupMethod('delete')(path);

