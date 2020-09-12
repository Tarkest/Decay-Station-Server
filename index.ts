import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as Express from 'express';
import bodyParser = require("body-parser");
import { setup } from "./routes-setup";
import env from "./env.config";

const headerApply = (req, res, next) => {
  res.append('Content-Type', 'application/json');
  next();
}

const handleError = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ error: 'invalid token...'});
  }
}

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: number;
        iat: number;
      }
    }
  }
}

class App {
  app: Express.Application = Express();

  constructor() {
    createConnection(env(process.env.ENVIRONMENT_NAME))
    .then(_ => {
      this.app.use(bodyParser.json());
      this.app.use(headerApply);
      setup(this.app);
      this.app.use(handleError);
      this.app.listen(process.env.PORT ? process.env.PORT : 3000, () => {
        // tslint:disable-next-line: no-console
        console.log(`Server running on ${process.env.ENVIRONMENT_NAME ? process.env.ENVIRONMENT_NAME : "local"} environment, on ${process.env.PORT ? process.env.PORT : 3000} port`);
      });
    })
    // tslint:disable-next-line: no-console
    .catch(console.log)
  }
}

// tslint:disable-next-line: no-unused-expression
new App();
