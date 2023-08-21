const sequelize= require('sequelize')
const {configProperties} = require("../index");
const connection = new sequelize.Sequelize(
    configProperties.get("db.name"),
    configProperties.get("username"),
    configProperties.get("password"),
    {
        host: configProperties.get("db.host"),
        dialect: configProperties.get("db.dialect")
    }
)

module.exports={
    connection
}