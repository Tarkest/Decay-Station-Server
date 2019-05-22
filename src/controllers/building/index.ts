import {Router} from 'express'
import BuildingService from "../../services/building";

const userChecker = (req, res, next) => {
    req.userId = 1;
    next()
};

export class BuildingController {
    public router = Router();

    constructor() {
        const {router} = this;
        router.use('/', userChecker);
        router.post('/:id/addAction', this.addAction.bind(this));
        router.get('/:id/status', this.status.bind(this));
    }

    async addAction(req, res) {
        const {id} = req.params;
        res.send(await BuildingService.addAction(id, req.body));
    }

    async status(req, res) {
        const {id} = req.params;
        res.send(await BuildingService.checkStatus(id))
    }
}