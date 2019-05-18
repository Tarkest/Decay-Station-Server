import {Router} from 'express'

export class ItemController {
    public router = Router();

    constructor() {
        this.router.get('/', (req, res, next) => {
            res.send('test')
        })

    }
}