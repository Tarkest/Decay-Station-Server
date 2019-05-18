import {Router,} from 'express'
import LocomotiveService from "../../services/locomotive";

const userChecker = (req, res, next) => {
    req.userId = 1;
    next()
};

export class LocomotiveController {
    public router = Router();
    private service = new LocomotiveService();

    constructor() {
        this.router.use(userChecker);
        this.router.get('/', this.getUnits.bind(this));
        this.router.get('/:id/inventory', this.getItems.bind(this));
        this.router.post('/', this.addUnit.bind(this));
    }

    async addUnit(req, res, next) {
        const {body, userId} = req;
        try {
            res.send(await this.service.createLocomotive(body, userId))
        }
        catch (e) {
            res.send(e)
        }
    }

    async getUnits(req, res, next) {
        const {userId} = req;
        res.send(await this.service.getUserCarriages(userId))
    }

    async getItems(req, res, next) {
        const {id} = req.params;
        res.send(await this.service.getItems(id))
    }
}