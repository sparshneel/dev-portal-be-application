const {ConfigProperties} = require('../config/config.js')
const sequelize = require('sequelize')
const connection = new sequelize.Sequelize(
    ConfigProperties.get("db.name"),
    ConfigProperties.get("db.username"),
    ConfigProperties.get("db.password"),
    {
        host: ConfigProperties.get("db.host"),
        dialect: ConfigProperties.get("db.dialect")
    }
)

module.exports = {
    connection
}