const express = require('express')
const app = express()
const port = 8080
const PropertiesReader = require('properties-reader')
const {connection} = require("./dbConnection/connection");
const logger = require("pino")();
const router = app.Router()

app.listen(port)

const configProperties = PropertiesReader('./config/application.properties')

app.routes.use('/application',require('./routes/application.js'))

connection.authenticate().then(() => {
    logger.info('Connection has been established successfully.');
}).catch((error) => {
    logger.error('Unable to connect to the database: ', error);
});

module.exports = {
    router,
    configProperties
};