import 'reflect-metadata'
import {createConnection} from 'typeorm'
import * as Express from 'express';
//middleWares

const userChecker = (req, res, next) => {
    req.userId = 1;
    next()
};

import bodyParser = require("body-parser");

import {setup} from "./routes-setup";

class App {
    app: Express.Application = Express();

    constructor() {
        createConnection()
            .then(_ => {
                this.app.listen(3000, () => {
                    console.log('server running on 3000');
                });
                this.app.use(userChecker);
                this.app.use(bodyParser.json());
                setup(this.app);
            })
            .catch(console.log)
    }
}

new App();

