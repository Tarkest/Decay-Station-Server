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
        router.get('/inventory', this.getAllInventories.bind(this))
        router.post('/levelup', this.levelup.bind(this))
    }

    async getAllInfo(req, res, next) {
        const {userId} = req;
        try {
            res.send(await this.service.getAllUserInfo(userId))
        } catch (e) {
            res.send(e)
        }
    }

    async getAllInventories(req, res, next) {
        const {userId} = req;
        res.send(await this.service.getAllInventories(userId))
    }

    async levelup(req, res, next) {
        const {userId} = req;
        try {
            res.send(await this.service.levelUp(userId))
        } catch (e) {
            res.status(400).send(e.message);
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