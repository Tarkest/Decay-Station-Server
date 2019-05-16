import 'reflect-metadata'
import {createConnection} from 'typeorm'
import * as Express from 'express';
//middleWares

import {UserController} from './src/controllers';
import {CarriageController} from "./src/controllers/carriage";
import bodyParser = require("body-parser");

class App {
    app: Express.Application = Express();

    constructor() {
        createConnection()
            .then(_ => {
                this.app.listen(3000, () => {
                    console.log('server running on 3000');
                });
                this.app.use(bodyParser.json());
                this.app.use('/api/users', new UserController().router);
                this.app.use('/api/carriages', new CarriageController().router);
            })
            .catch(console.log)
    }
}

new App();

