const express = require('express')
const app = express()
const port = 8080
const {connection} = require("./dbConnection/connection")
const logger = require("pino")()

app.listen(port)
app.use(express.json())

const applicationRoutes = require('./routes/application');

app.use('/application', applicationRoutes);

connection.authenticate().then(() => {
    logger.info('Connection has been established successfully.');
}).catch((error) => {
    logger.error('Unable to connect to the database: ', error);
});