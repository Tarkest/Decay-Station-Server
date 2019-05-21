import {Router} from 'express'
import ItemService from "../../services/item";

const userChecker = (req, res, next) => {
    req.userId = 1;
    next()
};

export class ItemController {
    public router = Router();
    private service = new ItemService();

    constructor() {
        const {router} = this;
        router.post('/replace', this.replace.bind(this))
    }

    async replace(req, res, next) {
        const {from, to} = req.body;
        if (from && to) {
            try {
                await this.service.replaceItem(from, to);
                res.send({success: true});
            } catch (e) {
                console.log(e.message);
                res.sendStatus(500)
            }
        }
    }
}