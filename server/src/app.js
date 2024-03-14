const express = require('express');
const routes = require('./routes/routes.js');
const bodyParser = require('body-parser');
const cors = require('cors')

class App {
    constructor() {
        this.server = express()
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(cors());
        this.server.use(bodyParser.json());
    }

    routes() {
        this.server.use(routes);
    }
}

module.exports = new App().server;