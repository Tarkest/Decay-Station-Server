/* tslint:disable */
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as Express from 'express';
import bodyParser = require("body-parser");
import { setup } from "./routes-setup";
import * as config from "./config.json";
import env from "./env.config";
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
    createConnection(env(process.env.ENVIRONMENT_NAME)).catch(console.log)
  }

  listen() {
    this.app.use(userChecker);
    this.app.use(bodyParser.json());
    this.app.use(headerApply);
    setup(this.app);
    this.app.use(handleError);
    this.app.listen(config.port, () => {
        console.log(`Server running on \x1b[22m\x1b[32m${process.env.ENVIRONMENT_NAME ? process.env.ENVIRONMENT_NAME : "local"}\x1b[0m environment, on \x1b[22m\x1b[32m${config.port}\x1b[0m port`);
    });
  }
}

const app = new App();

app.listen();
