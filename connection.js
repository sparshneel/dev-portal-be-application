const sequelize= require('sequelize')
const PropertiesReader = require('properties-reader')
const configProperties = PropertiesReader("C:\\Users\\Sarvagram\\WebstormProjects\\dev-portal-application\\application.properties")
const connection = new sequelize.Sequelize(
    configProperties.get("db.name"),
    configProperties.get("db.username"),
    configProperties.get("db.password"),
    {
        host: configProperties.get("db.host"),
        dialect: configProperties.get("db.dialect")
    }
)

module.exports={
    connection
}