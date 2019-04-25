cd to project;
>install docker

use `docker-compose up` or docker desktop to run composer for install database

run  `npm install`;

run `ts-node ./node_modules/typeorm/cli.js  migration:run` script for create database basic tables required for project;

>run npm start

use rest client to get user with all info by http -GET to `localhost:9000/api/users/1/info`;
