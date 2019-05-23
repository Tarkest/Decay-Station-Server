import 'reflect-metadata'

const setMetadata = (route, target) => {
    if (!Reflect.hasMetadata('routes', target)) {
        Reflect.defineMetadata('routes', [route], target);
        return;
    }
    const routes = Reflect.getMetadata('routes', target);
    Reflect.defineMetadata('routes', [...routes, route], target);
};


export const setupMethod = method => path => (target, handler) => {
    const route = {
        path,
        method,
        handler
    };
    setMetadata(route, target);
};

export const setupController = globalPath => target=> {
    Reflect.defineMetadata('prefix', globalPath, target.prototype);
}