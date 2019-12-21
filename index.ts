/* tslint:disable */
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as Express from 'express';
import bodyParser = require("body-parser");
import { setup } from "./routes-setup";
// middleWares

const userChecker = (req, res, next) => {
    req.userId = 1;
    next()
};

const headerApply = (req, res, next) => {
    res.append('Content-Type', 'application/json');
    next();
}

const handleError = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({ error: 'invalid token...'});
    }
}

class App {
    app: Express.Application = Express();

    constructor() {
        createConnection()
            .then(_ => {
                this.app.use(userChecker);
                this.app.use(bodyParser.json());
                this.app.use(headerApply);
                setup(this.app);
                this.app.use(handleError);
                this.app.listen(3000, () => {
                    console.log('server running on 3000');
                });
            })
            .catch(console.log)
    }
}

new App();
