import {Router,} from 'express'
import CarriageService from "../../services/carriage";

const userChecker = (req, res, next) => {
    req.userId = 1;
    next()
};

export class CarriageController {
    public router = Router();
    private service = new CarriageService();

    constructor() {
        this.router.use('/', userChecker);
        this.router.post('/', this.addUnit.bind(this));
    }

    async addUnit(req, res, next) {
        const {body, userId} = req;
        try {
            res.send(await this.service.createCarriage(body, userId))
        }
        catch (e) {
            res.status(500).send(e.message)
        }
    }
}