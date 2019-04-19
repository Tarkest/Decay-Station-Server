import * as hapi from 'hapi'
import 'reflect-metadata'
import {createConnection} from 'typeorm'
import * as Controllers from './api/controllers'

const start = async function () {
    try {
        await server.start();
        Object.keys(Controllers).map(c => {
                const controller = Controllers[c];
                new controller(server)
            }
        )
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

createConnection()
    .then(async () => {
        await start();
    })
    .catch(console.error);

const server: hapi.Server = new hapi.Server({
    host: 'localhost',
    port: 9000
});


