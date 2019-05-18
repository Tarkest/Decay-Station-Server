import {Router} from 'express'
import UserService from "../../services/user";

const userChecker = (req, res, next) => {
    req.userId = 1;
    next()
};

export class UserController {
    public router = Router();
    private service = new UserService();

    constructor() {
        const {router} = this;
        router.use('/', userChecker);
        router.get('/info', this.getAllInfo.bind(this))
    }

    async getAllInfo(req, res, next) {
        const {userId} = req;
        try {
            res.send(await this.service.getAlluserInfo(userId))
        } catch (e) {
            res.send(e)
        }
    }

    async getUnit(req, res, next) {
        throw new Error('method not implemented')
    }

    async getUnits(req, res, next) {
        throw new Error('method not implemented')
    }

    async addUnit(req, res, next) {
        throw new Error('method not implemented')
    }

    async deleteUnit(req, res, next) {
        throw new Error('method not implemented')
    }

    async updateUnit(req, res, next) {
        throw new Error('method not implemented')
    }
}