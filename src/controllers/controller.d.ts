import {Request, Response, NextFunction, Router} from 'express';

export abstract class Controller {
    router: Router;

    abstract  getUnit(req: Request, res: Response, next: NextFunction): Promise<any>

    abstract  getUnits(req: Request, res: Response, next: NextFunction): Promise<any>

    abstract  addUnit(req: Request, res: Response, next: NextFunction): Promise<any>

    abstract  deleteUnit(req: Request, res: Response, next: NextFunction): Promise<any>

    abstract  updateUnit(req: Request, res: Response, next: NextFunction): Promise<any>

}